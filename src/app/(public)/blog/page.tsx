import { getAllPost } from "@/actions/post/post-actions";
import { DoclifyAuthorMeta } from "@/components/DoclifyAuthor/DoclifyAuthor";
import { DoclifyBlogCard } from "@/components/DoclifyCards/DoclifyCards";
import { DoclifyImage } from "@/components/ui/image";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { BlogType } from "@/types/schema.types";
import { Calendar1Icon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Latest Blogs",
  description: "Doclify",
};

export default async function Page() {
  const response = await getAllPost();

  if (response.success === false) {
    return (
      <div className="m-auto">
        <TypographyH2 className="mb-14">{response.message}</TypographyH2>
      </div>
    );
  } else {
    const blogs = response.content as BlogType[];
    const firstBlog = blogs[1] as BlogType;

    return (
      <div>
        <TypographyH2 className="mb-14">Latest Blogs</TypographyH2>

        {/* all blogs */}
        <div className="space-y-5">
          {/* top blog */}
          {firstBlog && (
            <div
              className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5 md:gap-10 hover:bg-accent transition-all duration-500 p-2 rounded-2xl mb-5"
              key={firstBlog.slug}
            >
              {/* image side */}
              <Link href={`/blog/${firstBlog.slug}`}>
                <DoclifyImage
                  src={firstBlog.frontMatter.image.url}
                  height={400}
                  width={800}
                  alt={firstBlog.frontMatter.title}
                  className="aspect-video"
                />
              </Link>
              {/* content side  */}
              <div className="flex flex-col justify-center px-5 md:px-0">
                <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                  <DoclifyAuthorMeta username={firstBlog.frontMatter.author} />
                </div>
                <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
                  <Calendar1Icon className="h-4 w-4 mr-2" />
                  Published at{" "}
                  {new Date(firstBlog.frontMatter.date).toLocaleString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </div>
                <TypographyH3>
                  <Link
                    href={`/blog/${firstBlog.slug}`}
                    className="hover:underline"
                  >
                    {firstBlog.frontMatter.title}
                  </Link>
                </TypographyH3>
                <TypographyP>
                  {firstBlog.frontMatter.description.slice(0, 80) + "..."}
                </TypographyP>
              </div>
            </div>
          )}

          {/* rest of the blog */}
          <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-5">
            {/* each item  */}
            {blogs.map((blog, index) => {
              if (index === 1) {
                return null;
              } else {
                return <DoclifyBlogCard blog={blog} key={blog.slug} />;
              }
            })}
          </div>
          {/* post horizontal */}
        </div>
      </div>
    );
  }
}
