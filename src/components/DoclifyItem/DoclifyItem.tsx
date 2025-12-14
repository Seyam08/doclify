import {
  Facebook,
  Linkedin,
  Twitter,
} from "@/components/DoclifyIcon/DoclifyIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import { SocialLinksType } from "@/types/schema.types";
import { ExternalLink, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import React, { ComponentProps } from "react";

type DoclifyItemType = {
  link: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  number?: number;
} & React.ComponentProps<"div">;

export function DoclifyItem({
  link,
  className,
  title,
  description,
  icon,
  number,
}: DoclifyItemType) {
  return (
    <Item variant="outline" asChild className={cn(className)}>
      <Link href={link} rel="noopener noreferrer" className="group">
        <ItemContent>
          <ItemTitle className="group-hover:underline">{title}</ItemTitle>
          {description && <ItemDescription>{description}</ItemDescription>}
        </ItemContent>
        {number && (
          <ItemMedia>
            <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              variant="destructive"
            >
              {number}
            </Badge>
          </ItemMedia>
        )}
        <ItemActions>{icon}</ItemActions>
      </Link>
    </Item>
  );
}

export function DoclifySocialLinkItem({
  name,
  socialLink,
}: {
  name: "facebook" | "linkedin" | "twitter" | string;
  socialLink: string;
}) {
  let Icon;
  switch (name) {
    case "facebook":
      Icon = Facebook;
      break;
    case "linkedin":
      Icon = Linkedin;
      break;
    case "twitter":
      Icon = Twitter;
      break;
    default:
      Icon = LinkIcon;
      break;
  }
  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <Icon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Your {name} account's link</ItemTitle>
        <ItemDescription>{socialLink}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          size="icon-sm"
          variant="outline"
          className="rounded-full"
          aria-label="Invite"
          asChild
        >
          <Link href={socialLink} target="_blank" className="group">
            <ExternalLink className="group-hover:rotate-45 transition-all" />
          </Link>
        </Button>
      </ItemActions>
    </Item>
  );
}

export function DoclifySocialLinkShow({
  address,
  platform,
  className,
}: SocialLinksType & ComponentProps<"div">) {
  let Icon;
  switch (platform) {
    case "facebook":
      Icon = Facebook;
      break;
    case "linkedin":
      Icon = Linkedin;
      break;
    case "twitter":
      Icon = Twitter;
      break;
    default:
      Icon = LinkIcon;
      break;
  }
  return (
    <Item variant="default" asChild className={cn(className)}>
      <Link
        href={address}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <ItemMedia variant="icon">
          <Icon className="h-4 w-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="group-hover:underline capitalize text-center">
            {platform}
          </ItemTitle>
        </ItemContent>
      </Link>
    </Item>
  );
}
