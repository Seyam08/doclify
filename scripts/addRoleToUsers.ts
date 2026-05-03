import nextEnv from "@next/env";
import type { AnyBulkWriteOperation, Types } from "mongoose";
import mongoose from "mongoose";

import { connectDB } from "../src/lib/mongoConnection.ts";
import { Author } from "../src/models/author.ts";
import { Blog } from "../src/models/blog.ts";

const { loadEnvConfig } = nextEnv;

type Role = "author" | "user";

type MigrationCandidate = {
  _id: Types.ObjectId;
  nextRole: Role;
};

const BATCH_SIZE = 500;
const missingRoleFilter = { role: { $exists: false } };

function getRoleUpdateOperation(
  _id: Types.ObjectId,
  role: Role,
): AnyBulkWriteOperation {
  return {
    updateOne: {
      filter: { _id, role: { $exists: false } },
      update: { $set: { role } },
    },
  };
}

async function flushRoleUpdates(
  role: Role,
  operations: AnyBulkWriteOperation[],
): Promise<number> {
  if (operations.length === 0) {
    return 0;
  }

  const result = await Author.bulkWrite(operations, { ordered: false });
  const modifiedCount = result.modifiedCount ?? 0;

  console.log(`Updated ${modifiedCount} user(s) to role "${role}".`);
  operations.length = 0;

  return modifiedCount;
}

async function closeConnection(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

async function migrateRoles(): Promise<void> {
  console.log("Starting addRoleToUsers migration...");
  console.log("Loading environment variables...");
  loadEnvConfig(process.cwd());

  if (!process.env.MONGO_DB_CONNECTION_STRING) {
    throw new Error("Missing MONGO_DB_CONNECTION_STRING environment variable.");
  }

  console.log("Connecting to MongoDB...");
  await connectDB();
  console.log("Connected to MongoDB.");

  const totalUsersChecked = await Author.countDocuments(missingRoleFilter);
  console.log(`Found ${totalUsersChecked} user(s) without a role.`);

  if (totalUsersChecked === 0) {
    console.log("Nothing to migrate.");
    console.log("Total users checked: 0");
    console.log("Role set to author : 0");
    console.log("Role set to user : 0");
    return;
  }

  const cursor = Author.aggregate<MigrationCandidate>([
    { $match: missingRoleFilter },
    {
      $lookup: {
        from: Blog.collection.name,
        let: { username: "$username" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$frontMatter.author", "$$username"] },
            },
          },
          { $limit: 1 },
          { $project: { _id: 1 } },
        ],
        as: "matchingBlogs",
      },
    },
    {
      $project: {
        _id: 1,
        nextRole: {
          $cond: [{ $gt: [{ $size: "$matchingBlogs" }, 0] }, "author", "user"],
        },
      },
    },
  ])
    .allowDiskUse(true)
    .cursor({ batchSize: BATCH_SIZE });

  const authorUpdates: AnyBulkWriteOperation[] = [];
  const userUpdates: AnyBulkWriteOperation[] = [];
  let processedUsers = 0;
  let authorsMade = 0;
  let usersMade = 0;

  console.log("Checking blog ownership and updating roles in batches...");

  for await (const candidate of cursor) {
    processedUsers += 1;

    if (candidate.nextRole === "author") {
      authorUpdates.push(getRoleUpdateOperation(candidate._id, "author"));
    } else {
      userUpdates.push(getRoleUpdateOperation(candidate._id, "user"));
    }

    if (authorUpdates.length >= BATCH_SIZE) {
      authorsMade += await flushRoleUpdates("author", authorUpdates);
    }

    if (userUpdates.length >= BATCH_SIZE) {
      usersMade += await flushRoleUpdates("user", userUpdates);
    }
  }

  authorsMade += await flushRoleUpdates("author", authorUpdates);
  usersMade += await flushRoleUpdates("user", userUpdates);

  console.log("Migration completed successfully.");
  console.log(`Total users checked: ${processedUsers}`);
  console.log(`কতজন author বানানো হলো: ${authorsMade}`);
  console.log(`কতজন user বানানো হলো: ${usersMade}`);
}

async function main(): Promise<void> {
  let exitCode = 0;

  try {
    await migrateRoles();
  } catch (error) {
    exitCode = 1;
    console.error("Migration failed.");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  } finally {
    try {
      await closeConnection();
    } catch (error) {
      exitCode = 1;
      console.error("Failed to close MongoDB connection.");

      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  process.exitCode = exitCode;
}

void main();
