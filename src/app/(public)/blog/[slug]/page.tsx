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
import { cacheLife, cacheTag } from "next/cache";
import { ImageProps } from "next/image";
import Link from "next/link";
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
      openGraph: {
        title: blog.frontMatter.title,
        description: blog.frontMatter.description,
        url: `https://doclify.com/blog/${blog.slug}`,
        siteName: "Doclify",
        images: [
          {
            url: blog.frontMatter.image.url,
            width: 1200,
            height: 630,
            alt: blog.frontMatter.title,
          },
        ],
        type: "article",
      },
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
  cacheLife("days");
  cacheTag("doclify-single-post");

  const { slug } = await params;
  const response = await getPost(slug);
  const baseUrl = process.env.AUTH_URL;

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
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${baseUrl}/blog/${blog.slug}`)}`}
                  target="_blank"
                >
                  <Facebook />
                </Link>
              </Button>
              {/* linkedin */}
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    `${baseUrl}/blog/${blog.slug}`,
                  )}`}
                  target="_blank"
                >
                  <Linkedin />
                </Link>
              </Button>
              {/* x Twitter */}
              <Button variant="outline" size="icon" asChild>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blog.slug)}&text=${encodeURIComponent(blog.frontMatter.title)}`}
                  target="_blank"
                >
                  <Twitter />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
