"use server";

import { Author } from "@/models/author";
import { Blog } from "@/models/blog";
import { AuthorType, BlogType } from "@/types/schema.types";

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
/**
 * Check if a blog slug already exists.
 *
 * ⚠️ NOTICE:
 * You MUST slugify the title before calling this function.
 *
 * Example:
 *   const slug = slugify(title);
 *   await checkBlogSlugExists(slug);
 *
 * @param title - A slugified string created from the blog title.
 * @returns  Promise<{
  status: boolean;
  blog: BlogType | null;
}>
 */
export async function checkBlogSlugExists(title: string): Promise<{
  status: boolean;
  blog: BlogType | null;
}> {
  if (title.includes(" ")) {
    console.warn("Warning: 'slug' contains spaces. Did you forget to slugify?");
    throw new Error("'slug' contains spaces. Did you forget to slugify?");
  } else {
    try {
      const post = await Blog.findOne({
        slug: title,
      });

      if (post) {
        return {
          status: true,
          blog: post,
        };
      } else {
        return {
          status: false,
          blog: null,
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Something went wrong while checking Blog slug!");
      }
    }
  }
}
