"use client";

import dynamic from "next/dynamic";

const AddPost = dynamic(() => import("@/components/ui/add-post/add-post"), {
  ssr: false,
});

export default function AddPostWrapper({
  categoryList,
  tagList,
}: {
  categoryList: string[];
  tagList: string[];
}) {
  return <AddPost categoryList={categoryList} tagList={tagList} />;
}
