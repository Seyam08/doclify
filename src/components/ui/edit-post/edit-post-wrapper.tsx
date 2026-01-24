"use client";

import { BlogFrontMatterType } from "@/types/schema.types";
import dynamic from "next/dynamic";
import EditPost from "./edit-post";

const AddPost = dynamic(() => import("@/components/ui/add-post/add-post"), {
  ssr: false,
});

export default function EditPostWrapper({
  categoryList,
  tagList,
  existedCategories,
  existedTags,
  BlogFrontMatter,
  content,
  blogSlug,
}: {
  categoryList: string[];
  tagList: string[];
  existedCategories?: string[];
  existedTags?: string[];
  BlogFrontMatter: BlogFrontMatterType;
  content: string;
  blogSlug: string;
}) {
  return (
    <EditPost
      categoryList={categoryList}
      tagList={tagList}
      existedCategories={existedCategories}
      existedTags={existedTags}
      BlogFrontMatter={BlogFrontMatter}
      existedContent={content}
      blogSlug={blogSlug}
    />
  );
}
