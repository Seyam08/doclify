import { cn } from "@/lib/utils";
import Image from "next/image";
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
        "bg-accent group w-full overflow-hidden flex items-center justify-center rounded-2xl",
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
