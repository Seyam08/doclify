import { AuthorSchema } from "@/models/author";
import type { InferSchemaType } from "mongoose";

export type AuthorType = Omit<
  InferSchemaType<typeof AuthorSchema>,
  "DefaultTimestampProps" | "createdAt" | "updatedAt"
>;
