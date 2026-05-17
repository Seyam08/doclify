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
        "ollyo-card border border-[#DDDDDD] p-2",
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
            className="aspect-video rounded-none"
          />
        </Link>
      </div>

      {/* content side  */}
      <div className="space-y-4 px-5 py-6">
        <div className="ollyo-meta flex items-center justify-start">
          <DoclifyAuthorMeta username={blog.frontMatter.author} />
        </div>
        <div className="ollyo-meta flex items-center justify-start">
          <Calendar1Icon className="h-4 w-4 mr-2" />
          Published at{" "}
          {new Date(blog.frontMatter.date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
        <TypographyH3 className="ollyo-card-title">
          <Link href={`/blog/${blog.slug}`} className="hover:text-[#5409DA]">
            {blog.frontMatter.title}
          </Link>
        </TypographyH3>
        <TypographyP className="ollyo-copy">
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
    <div className={cn("border-l-2 border-[#9FFA62] pl-4", className)} key={blog.slug}>
      {/* content side  */}
      <div className="pb-5 space-y-3">
        <TypographyH3 className="ollyo-mini-title">
          <Link href={`/blog/${blog.slug}`} className="hover:text-[#5409DA]">
            {blog.frontMatter.title}
          </Link>
        </TypographyH3>
        <div className="ollyo-meta flex items-center justify-start">
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
