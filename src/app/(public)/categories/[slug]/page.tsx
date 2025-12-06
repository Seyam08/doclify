import { getSingleMeta } from "@/actions/post/post-actions";
import { DoclifyBlogCard } from "@/components/DoclifyCards/DoclifyCards";
import { TypographyH2 } from "@/components/ui/typography";
import { BlogType } from "@/types/schema.types";
import { Metadata } from "next";

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
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const response = await getSingleMeta("categories", decodedSlug);

  if (response.success === false) {
    return (
      <div className="m-auto">
        <TypographyH2 className="mb-14 capitalize">
          {response.message}
        </TypographyH2>
      </div>
    );
  } else {
    const blogs = response.content as BlogType[];
    return (
      <div>
        <TypographyH2 className="mb-14 capitalize">{decodedSlug}</TypographyH2>

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
