import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

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
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
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
