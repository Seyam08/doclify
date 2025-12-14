import { getPostByAuthor } from "@/actions/post/post-actions";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { DoclifyImage } from "@/components/ui/image";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { TypographyH2, UnderlineLink03 } from "@/components/ui/typography";
import { BlogType } from "@/types/schema.types";
import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  const response = await getPostByAuthor(session?.user.username as string);

  if (response.success === false) {
    return (
      <main className="flex w-full flex-col gap-6 p-4 pt-0">
        <TypographyH2>My Blogs</TypographyH2>

        <Item variant="outline">
          <ItemContent>
            <ItemTitle>{response.message}</ItemTitle>
            <ItemDescription className="hidden md:block">
              Click the icon to publish one
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="outline"
              size="sm"
              aria-label="View"
              asChild
              className="group"
            >
              <Link href={"/dashboard/add-post"}>
                <span className="hidden md:block">add</span>
                <Plus className="group-hover:rotate-90 transition-all duration-300" />
              </Link>
            </Button>
          </ItemActions>
        </Item>
      </main>
    );
  } else {
    const blogs = response.content as BlogType[]; // blogs can be undefine or null
    const numberOfBlogs = blogs?.length; // number of blog can be undefine also, because of blog

    return (
      <main className="flex w-full flex-col gap-6 p-4 pt-0">
        <TypographyH2>My Blogs</TypographyH2>
        {numberOfBlogs > 0 &&
          blogs.map((blog) => (
            <Item variant="outline" key={blog.slug}>
              <ItemMedia>
                <DoclifyImage
                  src={blog.frontMatter.image.url}
                  alt={blog.frontMatter.title}
                  height={50}
                  width={50}
                  className="size-10 cursor-pointer rounded-sm"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  <UnderlineLink03 href={`/blog/${blog.slug}`}>
                    {blog.frontMatter.title}
                  </UnderlineLink03>
                </ItemTitle>
                <ItemDescription className="hidden md:block">
                  {blog.frontMatter.description.slice(0, 50) + "..."}
                </ItemDescription>
              </ItemContent>
              <ItemContent className="ml-auto">
                <ItemDescription className="text-xs">
                  {new Date(blog.frontMatter.date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="outline" size="sm" aria-label="View" asChild>
                  <Link href={`/blog/${blog.slug}`}>
                    <span className="hidden md:block">View</span>
                    <ArrowUpRight />
                  </Link>
                </Button>
              </ItemActions>
            </Item>
          ))}
      </main>
    );
  }
}
