import { DoclifyBlogCardSkeleton } from "@/components/DoclifyCards/DoclifyCardsSkeleton";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="content-holder flex flex-col items-center space-y-5">
        <Skeleton className="w-36 h-36" />

        <Skeleton className="h-8 w-52" />

        <Skeleton className="h-8 w-72" />

        <Skeleton className="h-20 w-3/4" />

        <div className="max-w-full flex gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton className="h-8 w-36" key={index} />
          ))}
        </div>

        <Separator className="my-5" />
      </div>
      {/* post of author  */}
      <div>
        {/* each item */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* each item  */}
          {Array.from({ length: 3 }).map((_, index) => (
            <DoclifyBlogCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
