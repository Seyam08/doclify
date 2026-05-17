"use cache";

import { getAllPost, getTotalBlogsNumber } from "@/actions/post/post-actions";
import { DoclifyBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { DoclifyAuthorMeta } from "@/components/DoclifyAuthor/DoclifyAuthor";
import { DoclifyBlogCard } from "@/components/DoclifyCards/DoclifyCards";
import DoclifyPagination from "@/components/DoclifyPagination/DoclifyPagination";
import { DoclifyImage } from "@/components/ui/image";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { BlogType } from "@/types/schema.types";
import { Calendar1Icon } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  "use cache";
  cacheLife("days");
  cacheTag("doclify-blog-posts");

  const { slug } = await params;
  const pageNumber: number = Number(slug);
  const totalPagesRes = await getTotalBlogsNumber();

  if (isNaN(pageNumber) || pageNumber < 1) {
    return notFound();
  }

  const limit: number = process.env.BLOG_PER_PAGE
    ? parseInt(process.env.BLOG_PER_PAGE)
    : 3;

  const skip: number = (pageNumber - 1) * limit;

  const response = await getAllPost(limit, skip, "desc");

  if (response.success === false || totalPagesRes.success === false) {
    return notFound();
  } else if (response?.content === null || response?.content?.length === 0) {
    return notFound();
  } else {
    const blogs = response.content as BlogType[];
    const firstBlog = blogs[0] as BlogType;
    const totalBlogs = totalPagesRes.content as number;
    const totalPages = Math.ceil(totalBlogs / limit);

    return (
      <div>
        <div className="ollyo-page-heading">
          <TypographyH2 className="ollyo-page-title">Latest Blogs</TypographyH2>
          <DoclifyBreadcrumb removeLast={2} />
        </div>

        {/* all blogs */}
        <div className="space-y-8">
          {/* top blog */}
          {firstBlog && (
            <div
              className="ollyo-featured-post mb-5 grid grid-cols-1 gap-5 border border-[#DDDDDD] p-2 md:grid-cols-2 md:gap-10"
              key={firstBlog.slug}
            >
              {/* image side */}
              <Link href={`/blog/${firstBlog.slug}`}>
                <DoclifyImage
                  src={firstBlog.frontMatter.image.url}
                  height={400}
                  width={800}
                  alt={firstBlog.frontMatter.title}
                  className="aspect-video rounded-none"
                />
              </Link>
              {/* content side  */}
              <div className="flex flex-col justify-center px-5 py-6 md:px-0">
                <div className="ollyo-meta mb-4 flex items-center justify-start">
                  <DoclifyAuthorMeta username={firstBlog.frontMatter.author} />
                </div>
                <div className="ollyo-meta mb-4 flex items-center justify-start">
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
                <TypographyH3 className="ollyo-card-title">
                  <Link
                    href={`/blog/${firstBlog.slug}`}
                    className="hover:text-[#5409DA]"
                  >
                    {firstBlog.frontMatter.title}
                  </Link>
                </TypographyH3>
                <TypographyP className="ollyo-copy mt-4">
                  {firstBlog.frontMatter.description.slice(0, 80) + "..."}
                </TypographyP>
              </div>
            </div>
          )}

          {/* rest of the blog */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* each item  */}
            {blogs.map((blog, index) => {
              if (index === 0) {
                return null;
              } else {
                return <DoclifyBlogCard blog={blog} key={blog.slug} />;
              }
            })}
          </div>

          {/* pagination  */}
          <div className="grid grid-cols-1 grid-rows-1 gap-5">
            {/* each item  */}
            <DoclifyPagination
              currentPage={pageNumber}
              totalPages={totalPages}
              basePath="/blog"
            />
          </div>
          {/* post horizontal */}
        </div>
      </div>
    );
  }
}
