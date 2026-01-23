import * as z from "zod";

export const addPostSchema = z.object({
  title: z
    .string()
    .min(5, "Blog title must be at least 5 characters.")
    .max(80, "Blog title must be at most 80 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(200, "Description must be at most 200 characters."),
  content: z
    .string()
    .min(
      200,
      "Content must be more then 200 characters. And make sure you saved it!",
    ),
  thumbnail: z
    .file({ error: "Thumbnail should be a JPG or PNG file!" })
    .max(2000000, {
      error: "File must be less then 2MB",
    })
    .mime(["image/png", "image/jpeg"], {
      error: "Only accept JPG and PNG",
    }),
});

export const editPostSchema = z.object({
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(200, "Description must be at most 200 characters."),
  content: z
    .string()
    .min(
      200,
      "Content must be more then 200 characters. And make sure you saved it!",
    ),
  thumbnail: z
    .file({ error: "Thumbnail should be a JPG or PNG file!" })
    .max(2000000, {
      error: "File must be less then 2MB",
    })
    .mime(["image/png", "image/jpeg"], {
      error: "Only accept JPG and PNG",
    })
    .optional(),
});
