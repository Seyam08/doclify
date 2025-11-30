import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-30 w-full" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-10 w-2/5" />
      <Skeleton className="h-96 w-full" />
      <Skeleton className="h-screen w-full" />
    </>
  );
}
