"use server";

import { Author } from "@/models/author";
import { Blog } from "@/models/blog";
import { AuthorType } from "@/types/schema.types";
import { checkAuthorEmailExists } from "./checkCredentialsExists";

export async function checkBlogExistForThisUser(
  username: string,
): Promise<{ status: boolean; hasBlog: boolean; author: AuthorType | null }> {
  try {
    const author = await Author.findOne({ username: username });

    if (!author) {
      return { status: false, hasBlog: false, author: null };
    }

    // Confirm the author's email exists using the existing helper
    const emailCheck = await checkAuthorEmailExists(author.authorInfo.email);

    if (!emailCheck.status) {
      return { status: false, hasBlog: false, author: null };
    }

    const post = await Blog.findOne({ "frontMatter.author": username });

    if (post) {
      return { status: true, hasBlog: true, author: author };
    } else {
      return { status: true, hasBlog: false, author: author };
    }
  } catch (error) {
    return { status: false, hasBlog: false, author: null };
  }
}
