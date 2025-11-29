"use server";

import {
  checkAuthorEmailExists,
  checkBlogSlugExists,
} from "@/actions/helper/checkCredentialsExists";
import { auth } from "@/auth";
import { uploadImage } from "@/lib/cloudinary/upload-image";
import { connectDB } from "@/lib/mongoConnection";
import { Blog } from "@/models/blog";
import { ServerActionResponse } from "@/types/global-types";
import { BlogType } from "@/types/schema.types";
import { addPostSchema } from "@/zod-schemas/schema";
import { UploadApiResponse } from "cloudinary";
import slugify from "slugify";
import z from "zod";

type AddPost = z.infer<typeof addPostSchema> & {
  content: string;
  categories: string[];
  tags: string[];
};
export async function addPost(
  params: AddPost
): Promise<ServerActionResponse<string | undefined>> {
  try {
    await connectDB();
    // making slug from title
    const slug = slugify(params.title, {
      lower: true,
      strict: true,
      remove: /[']/g,
    });
    // checking if slug exist
    const slugExist = await checkBlogSlugExists(slug);

    // if slug exist then throw an error
    if (slugExist?.status === true) {
      return {
        success: false,
        message: "Title already exist, please choose a new one!",
      } satisfies ServerActionResponse;
    } else {
      const session = await auth();
      const authorInfo = await checkAuthorEmailExists(
        session?.user?.email as string
      );

      if (authorInfo.status === true) {
        const author = authorInfo.author?.username as string;

        const image = params.thumbnail;

        // upload the image
        const uploadResult: UploadApiResponse = await uploadImage(
          image,
          process.env.CLOUDINARY_DOCLIFY_BLOG_THUMB_FOLDER as string
        );

        const post: BlogType = {
          slug,
          content: params.content,
          frontMatter: {
            author,
            title: params.title,
            description: params.description,
            date: new Date(),
            image: {
              publicId: uploadResult.public_id,
              url: uploadResult.secure_url,
            },
            categories: params.categories,
            tags: params.tags,
            featured: false,
            postOfTheMonth: false,
          },
        };

        const result: BlogType = await Blog.create(post);
        return {
          success: true,
          message: "New blog created",
          content: result.slug,
        } satisfies ServerActionResponse<string>;
      } else {
        return {
          success: false,
          message: "There is something wrong with Author!",
        } satisfies ServerActionResponse;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to add post");
  }
}

export async function getPostMeta(
  meta: "categories" | "tags"
): Promise<ServerActionResponse<Array<string>>> {
  try {
    await connectDB();

    // Get all unique categories
    const categories = await Blog.distinct(`frontMatter.${meta}`);

    return {
      success: true,
      message: "Categories received.",
      content: categories,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: "Failed to load categories!",
      content: [],
    };
  }
}
