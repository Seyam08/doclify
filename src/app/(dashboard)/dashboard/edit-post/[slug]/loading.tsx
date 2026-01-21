import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-5 pt-0 pb-5">
      <div className="flex flex-col md:flex-row gap-2 border w-full h-screen rounded-lg p-2">
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}
