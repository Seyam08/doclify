"use server";

import { connectDB } from "@/lib/mongoConnection";
import { Author } from "@/models/author";
import { ServerActionResponse } from "@/types/global-types";
import { AuthorType } from "@/types/schema.types";
import { cache } from "react";

export type BioState = {
  submitted: boolean;
  success: boolean | null; // null means "not submitted yet"
  message: string;
  prevBio?: string | null;
};
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

export const getAuthorByEmail = cache(
  async (email: string): Promise<ServerActionResponse<AuthorType>> => {
    try {
      await connectDB();
      const author: AuthorType | null = await Author.findOne({
        "authorInfo.email": email,
      });

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
);

export async function updateBio(
  prevState: BioState,
  formData: FormData
): Promise<BioState> {
  const newBio = formData.get("edit-bio") as string;
  const trimmedBio = newBio.trim();
  const email = formData.get("email") as string;

  // 1️⃣ Compare previous & new bio
  if (prevState.prevBio === trimmedBio) {
    return {
      submitted: true,
      success: false,
      message: "No changes to update!",
    };
  }

  try {
    const updatedBio = await Author.findOneAndUpdate(
      { "authorInfo.email": email }, // find author by email
      { "authorInfo.bio": trimmedBio }, // update field
      { new: true } // return updated doc
    );

    if (updatedBio) {
      return {
        success: true,
        submitted: true,
        message: "Bio updated successfully",
      };
    } else {
      return {
        success: false,
        submitted: true,
        message: "Bio update failed!",
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      submitted: true,
      message: "Unable to update Bio!",
    };
  }
}
