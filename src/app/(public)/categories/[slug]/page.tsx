import { getPostMeta, getSingleMeta } from "@/actions/post/post-actions";
import { DoclifyBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { DoclifyBlogCard } from "@/components/DoclifyCards/DoclifyCards";
import { TypographyH2 } from "@/components/ui/typography";
import { BlogType } from "@/types/schema.types";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await getPostMeta("categories");

  if (response.success === false) {
    return [];
  } else {
    const categories = response.content as string[];
    return categories.map((category) => ({
      slug: category,
    }));
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);
  const title = decodedSlug[0].toUpperCase() + decodedSlug.slice(1);

  return {
    title: title,
    description: "Doclify Category",
  };
}

export default async function page({ params }: Props) {
  "use cache";
  cacheLife("days");
  cacheTag("doclify-single-post-meta");

  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const response = await getSingleMeta("categories", decodedSlug);

  if (response.success === false) {
    return notFound();
  } else {
    const blogs = response.content as BlogType[];
    return (
      <div>
        <div className="ollyo-page-heading">
          <TypographyH2 className="ollyo-page-title">{decodedSlug}</TypographyH2>
          <DoclifyBreadcrumb />
        </div>

        {/* each item */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* each item  */}
          {blogs.map((blog) => (
            <DoclifyBlogCard blog={blog} key={blog.slug} />
          ))}
        </div>
        {/* post horizontal */}
      </div>
    );
  }
}
