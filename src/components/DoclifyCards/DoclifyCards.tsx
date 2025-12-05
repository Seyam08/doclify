import { DoclifyImage } from "@/components/ui/image";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { BlogType } from "@/types/schema.types";
import { Calendar1Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DoclifyAuthorMeta } from "../DoclifyAuthor/DoclifyAuthor";

type DoclifyBlogCardProps = {
  blog: BlogType;
} & React.ComponentProps<"div">;
export function DoclifyBlogCard({ blog, className }: DoclifyBlogCardProps) {
  return (
    <div
      className={cn(
        "space-y-5 hover:bg-accent transition-all duration-500 p-2 rounded-2xl",
        className
      )}
      key={blog.slug}
    >
      {/* image side */}
      <div>
        <Link href={`/blog/${blog.slug}`}>
          <DoclifyImage
            src={blog.frontMatter.image.url}
            height={400}
            width={1200}
            alt="Image"
            className="aspect-video"
          />
        </Link>
      </div>

      {/* content side  */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
          <DoclifyAuthorMeta username={blog.frontMatter.author} />
        </div>
        <div className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
          <Calendar1Icon className="h-4 w-4 mr-2" />
          Published at{" "}
          {new Date(blog.frontMatter.date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
        <TypographyH3>
          <Link href={`/blog/${blog.slug}`} className="hover:underline">
            {blog.frontMatter.title}
          </Link>
        </TypographyH3>
        <TypographyP>
          {blog.frontMatter.description.slice(0, 80) + "..."}
        </TypographyP>
      </div>
    </div>
  );
}

type DoclifyBlogMiniCardProps = {
  blog: BlogType;
} & React.ComponentProps<"div">;
export function DoclifyBlogMiniCard({
  blog,
  className,
}: DoclifyBlogMiniCardProps) {
  return (
    <div className={cn(className)} key={blog.slug}>
      {/* content side  */}
      <div className="pb-5 space-y-3">
        <TypographyH3 className="text-sm md:text-base">
          <Link href={`/blog/${blog.slug}`} className="hover:underline">
            {blog.frontMatter.title}
          </Link>
        </TypographyH3>
        <div className="flex items-center justify-start mb-4 text-primary text-sm">
          <Calendar1Icon className="h-4 w-4 mr-2" />

          {new Date(blog.frontMatter.date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}
