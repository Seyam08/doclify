import { DoclifyBlogCardSkeleton } from "@/components/DoclifyCards/DoclifyCardsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div>
      <Skeleton className="h-10 w-1/4 mb-14" />

      {/* first skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 transition-all duration-500 p-2 rounded-2xl mb-5">
        {/* image side */}

        <Skeleton className="w-full h-60" />
        {/* content side  */}
        <div className="flex flex-col justify-center space-y-2 px-5 md:px-0">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-1/2" />

          <Skeleton className="h-10 w-full" />

          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* each item  */}

        {Array.from({ length: 2 }).map((_, i) => (
          <DoclifyBlogCardSkeleton className="h-15 w-full" key={i} />
        ))}
      </div>
      {/* post horizontal */}
    </div>
  );
}
