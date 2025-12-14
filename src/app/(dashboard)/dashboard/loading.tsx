import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex w-full flex-col gap-6 p-4 pt-0">
      <Skeleton className="h-8" />
      <Separator />
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-18 w-full" />
      ))}
    </main>
  );
}
