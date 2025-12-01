import { getAuthor } from "@/actions/author/author-action";
import UnderlineLink from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function DoclifyImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group w-full aspect-video overflow-hidden flex items-center justify-center rounded-2xl",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="max-w-full max-h-full object-cover group-hover:scale-110 transition-all duration-500"
      />
    </div>
  );
}

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
