import { getAllPost, getPost } from "@/actions/post/post-actions";
import { DoclifyAuthorMeta } from "@/components/DoclifyAuthor/DoclifyAuthor";
import {
  Facebook,
  Linkedin,
  Twitter,
} from "@/components/DoclifyIcon/DoclifyIcon";
import { Button } from "@/components/ui/button";
import { DoclifyImage } from "@/components/ui/image";
import {
  TypographyH1,
  TypographyP,
  UnderlineLink,
} from "@/components/ui/typography";
import { BlogType } from "@/types/schema.types";
import { Calendar1Icon, ClockFading } from "lucide-react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { ImageProps } from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const response = await getAllPost();

  if (response.success === false) {
    return [];
  } else {
    const posts = response.content as BlogType[];
    return posts.map((post) => ({
      slug: post.slug,
    }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // fetch post information
  const response = await getPost(slug);

  if (response.success === true) {
    const blog = response.content as BlogType;
    return {
      title: blog.frontMatter.title,
      description: "Doclify Blog",
    };
  } else {
    return {
      title: "Blog Not Found",
      description: "Doclify",
    };
  }
}

export default async function Page({ params }: Props) {
  "use cache";
  cacheLife("hours");

  const { slug } = await params;
  const response = await getPost(slug);

  if (response.success === false) {
    return notFound();
  } else {
    const blog = response.content as BlogType;
    const content = blog.content as string;
    return (
      <div className="content-holder space-y-2">
        {/* categories and reading time section */}
        <p className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
          <ClockFading className="h-4 w-4 mr-2" />
          02 min reading in<span className="mx-2">—</span>
          {blog.frontMatter.categories.map((category, index) => (
            <span key={index}>
              <UnderlineLink href={`/categories/${category}`}>
                {category}
              </UnderlineLink>
              {index < blog.frontMatter.categories.length - 1 && (
                <span className="mx-1">,</span>
              )}
            </span>
          ))}
        </p>

        {/* heading section */}
        <TypographyH1 className="my-3 md:my-6">
          {blog.frontMatter.title}
        </TypographyH1>

        {/* description section */}
        <TypographyP className="my-1 md:my-2">
          {blog.frontMatter.description}
        </TypographyP>

        {/* Author and Date info section */}
        <div className="my-1 md:my-2">
          <p className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
            <DoclifyAuthorMeta username={blog.frontMatter.author} />
            <span className="mx-2">—</span>
            <Calendar1Icon className="h-4 w-4 mr-2" />
            Published at{" "}
            {new Date(blog.frontMatter.date).toLocaleString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        {/* thumbnail image section */}
        <div className="my-2 md:my-8">
          <DoclifyImage
            src={blog.frontMatter.image.url}
            alt={blog.frontMatter.title}
            width={1050}
            height={400}
            className="aspect-video"
            imageProps={
              {
                loading: "eager",
                priority: true,
              } as ImageProps
            }
          />
        </div>

        {/* post content section  */}
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="blog"
        ></div>

        {/* tags and share section  */}
        <div className="flex flex-nowrap flex-row items-start md:items-center justify-between my-4 md:my-8">
          {/* tags  */}
          <div>
            <TypographyP className="mb-2">Tags:</TypographyP>
            <div className="flex flex-wrap gap-2">
              {blog.frontMatter.tags.map((tag, index) => (
                <div className="border border-ring px-2 py-1" key={index}>
                  <UnderlineLink
                    href={`/tags/${tag}`}
                    className="text-sm text-primary"
                  >
                    # {tag}
                  </UnderlineLink>
                </div>
              ))}
            </div>
          </div>

          {/* share  */}
          <div>
            <TypographyP className="mb-2">Share:</TypographyP>
            <div className="flex flex-wrap gap-4 mt-2">
              {/* facebook  */}
              <Button variant="outline" size="icon">
                <Facebook />
              </Button>
              {/* linkedin */}
              <Button variant="outline" size="icon">
                <Linkedin />
              </Button>
              {/* x Twitter */}
              <Button variant="outline" size="icon">
                <Twitter />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
