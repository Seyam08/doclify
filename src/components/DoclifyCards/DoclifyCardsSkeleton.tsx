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
