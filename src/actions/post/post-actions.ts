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
import { cache } from "react";
import slugify from "slugify";
import z from "zod";

type AddPost = z.infer<typeof addPostSchema> & {
  content: string;
  categories: string[];
  tags: string[];
};

export type MetaStats = Array<{ _id: string; count: number }>;

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

export async function getDetailedPostMeta(
  meta: "categories" | "tags",
  limit: number = 0
): Promise<ServerActionResponse<MetaStats>> {
  try {
    await connectDB();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pipeline: any[] = [
      { $unwind: `$frontMatter.${meta}` },
      {
        $group: {
          _id: `$frontMatter.${meta}`,
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ];

    // Apply limit only if limit > 0
    if (limit > 0) {
      pipeline.push({ $limit: limit });
    }

    const metaStats: MetaStats = await Blog.aggregate(pipeline);

    if (metaStats.length > 0) {
      return {
        success: true,
        message: `${meta} received.`,
        content: metaStats,
      };
    } else {
      return {
        success: false,
        message: `There are no ${meta}`,
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: `Failed to load ${meta}!`,
    };
  }
}

export const getSingleMeta = cache(
  async (
    meta: "categories" | "tags",
    params: string
  ): Promise<ServerActionResponse<BlogType[]>> => {
    try {
      await connectDB();

      let blogs: BlogType[] | null;

      switch (meta) {
        case "categories":
          blogs = await Blog.find({
            "frontMatter.categories": params,
          });
          break;
        case "tags":
          blogs = await Blog.find({ "frontMatter.tags": params });
          break;
      }

      if (blogs.length > 0) {
        return {
          success: true,
          message: `Blogs Found for ${params}`,
          content: blogs,
        };
      } else {
        return {
          success: false,
          message: `There are no Blog in ${params}`,
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        success: false,
        message: "Failed to find blogs!",
      };
    }
  }
);

export const getPost = cache(
  async (params: string): Promise<ServerActionResponse<BlogType>> => {
    try {
      await connectDB();
      const blog: BlogType | null = await Blog.findOne({ slug: params });

      if (blog) {
        return {
          success: true,
          message: "Blog Found",
          content: blog,
        };
      } else {
        return {
          success: false,
          message: "Blog not Found",
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        success: false,
        message: "Failed to find blog!",
      };
    }
  }
);

export async function getAllPost(): Promise<ServerActionResponse<BlogType[]>> {
  try {
    await connectDB();
    const blogs: BlogType[] | null = await Blog.find()
      .select({ _id: 0 })
      .sort({ createdAt: -1 });

    if (blogs) {
      return {
        success: true,
        message: "Blogs Found",
        content: blogs,
      };
    } else {
      return {
        success: false,
        message: "There is no blogs at this moment!",
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: "Failed to get blogs!",
    };
  }
}

export const getPostByAuthor = cache(
  async (username: string): Promise<ServerActionResponse<BlogType[]>> => {
    try {
      await connectDB();
      const blogs: BlogType[] = await Blog.find({
        "frontMatter.author": username,
      })
        .select({ _id: 0 })
        .sort({ createdAt: -1 });

      if (blogs.length > 0) {
        return {
          success: true,
          message: "Blogs Found",
          content: blogs,
        };
      } else {
        return {
          success: false,
          message: "This Author have no blog till yet!",
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        success: false,
        message: "Failed to get blogs!",
      };
    }
  }
);

export async function getLimitedPost(
  limit: number = 10,
  order: "asc" | "desc" = "desc"
): Promise<ServerActionResponse<BlogType[]>> {
  try {
    await connectDB();

    const sortOrder = order === "desc" ? -1 : 1;

    const blogs: BlogType[] = await Blog.find()
      .sort({ createdAt: sortOrder })
      .limit(limit)
      .select({ _id: 0 });

    if (blogs.length > 0) {
      return {
        success: true,
        message: "Blogs Found",
        content: blogs,
      };
    } else {
      return {
        success: false,
        message: "There is no blogs at this moment!",
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: "Failed to get blogs!",
    };
  }
}
