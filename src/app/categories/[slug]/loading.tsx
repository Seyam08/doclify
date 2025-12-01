import { DoclifyBlogCardSkeleton } from "@/components/DoclifyCards/DoclifyCardsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div>
      <Skeleton className="h-10 w-1/4 mb-14" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* each item  */}
        {Array.from({ length: 3 }).map((_, i) => (
          <DoclifyBlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
