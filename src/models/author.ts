import mongoose, { Schema } from "mongoose";

const socialLinkSchema = new Schema(
  {
    name: { type: String },
    icon: { type: String },
    link: { type: String },
  },
  { _id: false }
);

const authorFrontMatterSchema = new Schema(
  {
    name: { type: String, required: true },
    designation: { type: String },
    image: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    socialLinks: { type: [socialLinkSchema], required: false },
  },
  { _id: false }
);

export const AuthorSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    authorInfo: { type: authorFrontMatterSchema, required: true },
    authorContent: { type: String },
  },
  { timestamps: true }
);

export const Author =
  mongoose.models.Author || mongoose.model("Author", AuthorSchema);
