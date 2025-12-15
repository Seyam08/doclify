import { getPostMeta, getSingleMeta } from "@/actions/post/post-actions";
import { DoclifyBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { DoclifyBlogCard } from "@/components/DoclifyCards/DoclifyCards";
import { TypographyH2 } from "@/components/ui/typography";
import { BlogType } from "@/types/schema.types";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await getPostMeta("tags");

  if (response.success === false) {
    return [];
  } else {
    const tags = response.content as string[];
    return tags.map((tag) => ({
      slug: tag,
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
    description: "Doclify Tag",
  };
}

export default async function page({ params }: Props) {
  "use cache";
  cacheLife("hours");

  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const response = await getSingleMeta("tags", decodedSlug);

  if (response.success === false) {
    return notFound();
  } else {
    const blogs = response.content as BlogType[];
    return (
      <div>
        <div className="flex justify-between items-center mb-14">
          <TypographyH2 className="capitalize">{decodedSlug}</TypographyH2>
          <DoclifyBreadcrumb />
        </div>

        {/* each item */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
