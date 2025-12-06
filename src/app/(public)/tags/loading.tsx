import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <div>
      <Skeleton className="h-10 w-1/4 mb-14" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {/* each item  */}

        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton className="h-15 w-full" key={i} />
        ))}
      </div>
      {/* post horizontal */}
    </div>
  );
}
