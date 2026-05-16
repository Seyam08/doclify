import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function NavbarSkeleton() {
  return <Skeleton className={cn("sticky h-16 top-0 z-50 w-full border-b")} />;
}

export function NewsLetterSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <div className="py-20 px-10 mx-auto flex flex-col md:flex-row items-stretch md:items-start justify-between gap-10 bg-background/30">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <Skeleton className="h-10 w-64 mx-auto md:mx-0 rounded-md" />
          <Skeleton className="h-4 w-48 mx-auto md:mx-0 rounded-md" />
        </div>

        <div className="flex-1 max-w-md space-y-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-12 w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
}
