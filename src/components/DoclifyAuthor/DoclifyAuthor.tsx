import { getAuthor } from "@/actions/author/author-action";
import { getPostByAuthor } from "@/actions/post/post-actions";
import { DoclifyBlogMiniCard } from "@/components/DoclifyCards/DoclifyCards";
import { Button } from "@/components/ui/button";
import { DoclifyImage } from "@/components/ui/image";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import UnderlineLink, {
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { AuthorType, BlogType } from "@/types/schema.types";
import { ExternalLink, SquarePen, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

type DoclifyWarnPopoverProps = {
  itemTitle: string;
  itemDesc?: string;
  externalLink?: string;
  trigger: ReactNode;
};

export async function DoclifyAuthorMeta({
  username,
}: {
  username: string;
} & React.ComponentProps<"div">) {
  const response = await getAuthor(username);

  if (response.success === false) {
    return (
      <>
        <User className="h-5 w-5 mr-2" />
        <span>by Anonymous</span>
      </>
    );
  } else {
    const author = response.content;
    const image = author?.authorInfo.image as string;
    const username = author?.username as string;
    return (
      <>
        <Link
          href={`/author/${username}`}
          className="flex group h-6 w-6 md:h-7 md:w-7 rounded-sm overflow-hidden mr-2"
        >
          <Image
            alt={username}
            height={28}
            width={28}
            src={image}
            className="group-hover:brightness-75 transition-all"
          />
        </Link>
        <span>
          by{" "}
          <UnderlineLink
            href={`/author/${username}`}
            className="text-accent-foreground"
          >
            {author?.authorInfo.name}
          </UnderlineLink>
        </span>
      </>
    );
  }
}

export function DoclifyWarnPopover({
  trigger,
  itemTitle,
  itemDesc,
  externalLink,
}: DoclifyWarnPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-96">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>{itemTitle}</ItemTitle>
            {itemDesc && (
              <ItemDescription>
                Please click on the button to change
              </ItemDescription>
            )}
          </ItemContent>
          {externalLink && (
            <ItemActions>
              <Button
                size="icon-sm"
                variant="outline"
                className="rounded-full"
                aria-label="Invite"
                asChild
              >
                <Link href={externalLink} target="_blank" className="group">
                  <ExternalLink className="group-hover:rotate-45 transition-all" />
                </Link>
              </Button>
            </ItemActions>
          )}
        </Item>
      </PopoverContent>
    </Popover>
  );
}

export async function DoclifyAuthorCard({
  author,
  username,
}: {
  author: AuthorType;
  username: string;
}) {
  const { authorInfo } = author;
  const { email, image, name, bio, socialLinks } = authorInfo;
  const blogResponse = await getPostByAuthor(username);
  const blogs = blogResponse.content as BlogType[]; // blogs can be undefine or null
  const numberOfBlogs = blogs?.length; // number of blog can be undefine also, because of blog
  return (
    <div className="bg-accent rounded-2xl p-3">
      {/* author info */}
      <div className="flex flex-row flex-wrap">
        <div className="basis-full md:basis-1/4 text-start">
          <DoclifyImage
            src={image}
            alt={name}
            height={150}
            width={150}
            className="block w-fit"
          />
        </div>
        <div className="basis-full md:basis-3/4 flex flex-col justify-center px-0 md:px-2 py-2 md:py-0">
          <TypographyH3>
            <UnderlineLink href={`/author/${username}`}>{name}</UnderlineLink>
          </TypographyH3>

          {bio && (
            <TypographyP>
              {bio.slice(0, 80)}...
              <UnderlineLink
                href={`/author/${username}`}
                className="ml-1 text-accent-foreground"
              >
                Read More
              </UnderlineLink>
            </TypographyP>
          )}
        </div>
      </div>

      <Separator className="w-full my-3" />
      {/* recent post */}
      <div>
        {/* title  */}
        <div>
          <TypographyP className="my-3 text-accent-foreground font-medium">
            Recent Post
          </TypographyP>
        </div>
        {/* posts  */}
        {numberOfBlogs > 0 ? (
          <div className="flex flex-row flex-wrap">
            {/* each blog  */}
            {blogs.slice(0, 2).map((blog) => (
              <div className="basis-full md:basis-1/2" key={blog.slug}>
                <DoclifyBlogMiniCard blog={blog} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-5">
            <TypographyH3 className="capitalize text-muted-foreground text-sm md:text-base">
              This user doesn&apos;t have any blog
            </TypographyH3>
          </div>
        )}
        {numberOfBlogs > 2 && (
          <div className="text-muted-foreground">
            <SquarePen className="inline-block h-4 w-4" /> {name} has{" "}
            <UnderlineLink
              href={`/author/${username}`}
              className="text-accent-foreground"
            >
              {numberOfBlogs - 2} more
            </UnderlineLink>{" "}
            Post to Read
          </div>
        )}
        {/* each item */}
      </div>
    </div>
  );
}
