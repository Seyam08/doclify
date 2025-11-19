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
    socialLinks: { type: [socialLinkSchema], default: [] },
  },
  { _id: false }
);

const authorSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    authorFrontMatter: { type: authorFrontMatterSchema, required: true },
    authorContent: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Author || mongoose.model("Author", authorSchema);
