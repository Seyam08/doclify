import { AuthorSchema, socialLinkSchema } from "@/models/author";
import { BlogSchema } from "@/models/blog";
import type { InferSchemaType } from "mongoose";

export type AuthorType = Omit<
  InferSchemaType<typeof AuthorSchema>,
  "DefaultTimestampProps" | "createdAt" | "updatedAt"
>;

export type BlogType = Omit<
  InferSchemaType<typeof BlogSchema>,
  "DefaultTimestampProps" | "createdAt" | "updatedAt"
>;

export type SocialLinksType = Omit<
  InferSchemaType<typeof socialLinkSchema>,
  "DefaultTimestampProps" | "createdAt" | "updatedAt"
>;
