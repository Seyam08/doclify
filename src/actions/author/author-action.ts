"use server";

import { connectDB } from "@/lib/mongoConnection";
import { Author } from "@/models/author";
import { ServerActionResponse } from "@/types/global-types";
import { AuthorType } from "@/types/schema.types";
import { SocialLinkSchemaType } from "@/zod-schemas/social-link-schema";
import { cache } from "react";

export type BioState = {
  submitted: boolean;
  success: boolean | null; // null means "not submitted yet"
  message: string;
  prevBio?: string | null;
};
export const getAuthor = cache(
  async (username: string): Promise<ServerActionResponse<AuthorType>> => {
    try {
      await connectDB();
      const author: AuthorType | null = await Author.findOne({ username })
        .select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        .lean<AuthorType>();

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

export const getAuthorByEmail = cache(
  async (email: string): Promise<ServerActionResponse<AuthorType>> => {
    try {
      await connectDB();
      const author: AuthorType | null = await Author.findOne({
        "authorInfo.email": email,
      })
        .select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        .lean<AuthorType>();

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

export async function editSocialLinks(
  socialLinks: SocialLinkSchemaType,
  email: string
): Promise<ServerActionResponse> {
  try {
    const updatedLinks = await Author.findOneAndUpdate(
      { "authorInfo.email": email }, // find author by email
      { "authorInfo.socialLinks": socialLinks.links }, // update field
      { new: true } // return updated doc
    );

    if (updatedLinks) {
      return {
        success: true,
        message: "Social links updated successfully",
      };
    } else {
      return {
        success: false,
        message: "Social links update failed!",
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: "Social links to update Bio!",
    };
  }
}
