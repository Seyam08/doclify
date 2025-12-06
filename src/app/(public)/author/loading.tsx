import { DoclifyAuthorCardSkeleton } from "@/components/DoclifyCards/DoclifyCardsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div>
      <Skeleton className="h-8 w-1/5 mb-5" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <DoclifyAuthorCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
