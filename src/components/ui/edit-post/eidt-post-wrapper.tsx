"use client";

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
}: {
  categoryList: string[];
  tagList: string[];
  existedCategories?: string[];
  existedTags?: string[];
}) {
  return (
    <EditPost
      categoryList={categoryList}
      tagList={tagList}
      existedCategories={existedCategories}
      existedTags={existedTags}
    />
  );
}
