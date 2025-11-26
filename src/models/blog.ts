import mongoose, { Schema } from "mongoose";

const frontMatterSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      _id: false,
      type: {
        url: { type: String, trim: true, required: true },
        publicId: { type: String, trim: true, required: true },
      },
      required: true,
    },
    date: { type: Date, required: true },
    featured: { type: Boolean, default: false },
    postOfTheMonth: { type: Boolean, default: false },
    author: { type: String, required: true },
    categories: [{ type: String }],
    tags: [{ type: String }],
  },
  { _id: false }
);

const blogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    frontMatter: { type: frontMatterSchema, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
