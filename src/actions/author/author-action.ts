"use server";

import { connectDB } from "@/lib/mongoConnection";
import { Author } from "@/models/author";
import { ServerActionResponse } from "@/types/global-types";
import { AuthorType } from "@/types/schema.types";

export async function getAuthor(
  username: string
): Promise<ServerActionResponse<AuthorType>> {
  try {
    await connectDB();
    const author: AuthorType | null = await Author.findOne({ username });

    if (author) {
      return {
        success: true,
        message: "Author Found",
        content: author,
      };
    } else {
      return {
        success: false,
        message: "Author not Found",
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: "Failed to find Author!",
    };
  }
}
