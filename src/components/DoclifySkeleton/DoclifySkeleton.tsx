import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export function NavbarSkeleton() {
  return <Skeleton className={cn("sticky h-16 top-0 z-50 w-full border-b")} />;
}
