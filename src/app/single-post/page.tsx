import { Skeleton } from "@/components/ui/skeleton";

export default function Login() {
  return (
    <div className="w-full space-y-4">
      <Skeleton className="h-24 w-3/5 rounded-md" />
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-52 w-full rounded-md" />
      <Skeleton className="h-6 w-full rounded-md" />
      <Skeleton className="h-28 w-2/5 rounded-md" />
    </div>
  );
}
