import { getPostMeta } from "@/actions/post/post-actions";
import AddPost from "@/components/ui/add-post/add-post";

export default async function Page() {
  const category = await getPostMeta("categories");
  const tags = await getPostMeta("tags");

  return (
    <div className="px-5 pt-0 pb-5">
      <AddPost
        categoryList={
          category.success ? (category.content as Array<string>) : []
        }
        tagList={tags.success ? (tags.content as Array<string>) : []}
      />
    </div>
  );
}
