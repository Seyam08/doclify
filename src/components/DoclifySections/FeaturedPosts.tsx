import { getAllPost } from "@/actions/post/post-actions";
import { DoclifyBlogCard } from "@/components/DoclifyCards/DoclifyCards";
import { TypographyH3, UnderlineLink02 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { BlogType } from "@/types/schema.types";
import { ArrowUpRight } from "lucide-react";
import { ComponentProps } from "react";

export default async function FeaturedPosts({
  title,
  limit,
  className,
}: {
  limit: number;
  title: string;
} & ComponentProps<"div">) {
  const response = await getAllPost(3);

  if (response.success === false) {
    return (
      <div className="m-auto text-center py-20">
        <TypographyH3 className="mb-14 capitalize">
          {response.message}
        </TypographyH3>
      </div>
    );
  } else {
    const blogs = response.content as BlogType[];
    return (
      <div className={cn("w-full", className)}>
        <div className="flex flex-row justify-between items-center mb-14">
          <TypographyH3 className="capitalize">{title}</TypographyH3>
          <UnderlineLink02 href="/blog">
            All Blogs
            <ArrowUpRight className="h-5 w-5 group-hover:rotate-45 transition-all duration-300" />
          </UnderlineLink02>
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
