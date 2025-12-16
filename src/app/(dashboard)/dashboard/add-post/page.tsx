import { getPostMeta } from "@/actions/post/post-actions";
import AddPostWrapper from "@/components/ui/add-post/add-post-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Blog",
  description: "Dashboard",
};
export default async function Page() {
  const categories = await getPostMeta("categories");
  const tags = await getPostMeta("tags");

  return (
    <div className="px-5 pt-0 pb-5">
      <AddPostWrapper
        categoryList={
          categories.success ? (categories.content as Array<string>) : []
        }
        tagList={tags.success ? (tags.content as Array<string>) : []}
      />
    </div>
  );
}
