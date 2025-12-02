import { getAuthor } from "@/actions/author/author-action";
import { Button } from "@/components/ui/button";
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
import UnderlineLink from "@/components/ui/typography";
import { ExternalLink, User } from "lucide-react";
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
