import { getPost, getPostMeta } from "@/actions/post/post-actions";
import EditPostWrapper from "@/components/ui/edit-post/edit-post-wrapper";
import { BlogType } from "@/types/schema.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Blog",
  description: "Dashboard",
};
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function Page({ params }: Props) {
  const categories = await getPostMeta("categories");
  const tags = await getPostMeta("tags");
  const { slug } = await params;
  const response = await getPost(slug);

  if (response.success === false) {
    return notFound();
  } else {
    const blog = response.content as BlogType;
    const content = blog.content as string;
    const existedCategories = blog.frontMatter.categories;
    const existedTags = blog.frontMatter.tags;

    return (
      <div className="px-5 pt-0 pb-5">
        <EditPostWrapper
          categoryList={
            categories.success ? (categories.content as Array<string>) : []
          }
          tagList={tags.success ? (tags.content as Array<string>) : []}
          existedCategories={existedCategories}
          existedTags={existedTags}
          BlogFrontMatter={blog.frontMatter}
          content={content}
          blogSlug={slug}
        />
      </div>
    );
  }
}
