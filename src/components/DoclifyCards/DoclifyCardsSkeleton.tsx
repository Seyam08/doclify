import { cn } from "@/lib/utils";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export function DoclifyBlogCardSkeleton({
  className,
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("space-y-5 p-2 rounded-2xl", className)}>
      {/* image side */}
      <Skeleton className="h-60 w-full" />

      {/* content side  */}
      <div className="px-5 pb-5 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-8 w-1/2" />

        <Skeleton className="h-10 w-full" />

        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export async function DoclifyAuthorCardSkeleton() {
  return (
    <div className="space-y-2">
      {/* author info */}
      <div className="flex flex-row flex-wrap md:flex-nowrap gap-2">
        <div className="basis-full md:basis-1/4 text-start">
          <Skeleton className="h-36 w-36" />
        </div>
        <div className="basis-full md:basis-3/4 flex flex-col gap-2 justify-center">
          <Skeleton className="h-5 w-18" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>

      {/* recent post */}
      <div className="space-y-2">
        {/* title  */}
        <div>
          <Skeleton className="h-5 w-18" />
        </div>
        {/* posts  */}

        <div className="flex flex-row flex-wrap md:flex-nowrap gap-2">
          {/* each blog  */}
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="basis-full md:basis-1/2" key={index}>
              <Skeleton className="h-40 w-full" />
            </div>
          ))}
        </div>

        {/* each item */}
      </div>
    </div>
  );
}
