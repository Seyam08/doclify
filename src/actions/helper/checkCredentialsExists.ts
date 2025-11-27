"use server";

import { Author } from "@/models/author";
import { AuthorType } from "@/types/schema.types";

export async function checkAuthorEmailExists(email: string): Promise<{
  status: boolean;
  author: AuthorType | null;
}> {
  try {
    const author = await Author.findOne({
      "authorInfo.email": email,
    });

    if (author) {
      return {
        status: true,
        author: author,
      };
    } else {
      return {
        status: false,
        author: null,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      status: false,
      author: null,
    };
  }
}
