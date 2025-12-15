import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-separator";

export default function Loading() {
  return (
    <section className="container mx-auto px-5 pt-0 pb-5 space-y-4">
      {/* heading */}
      <Skeleton className="h-10" />
      <Separator />
      <Skeleton className="h-10" />

      {/* image */}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Skeleton className="h-24 w-24" />
        <div className="text-center sm:text-left space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>

      {/* name and email  */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* name  */}
        <Skeleton className="h-10" />

        {/* email */}
        <Skeleton className="h-10" />
      </div>
      {/* bio */}
      <div>
        <Skeleton className="h-52" />
      </div>
    </section>
  );
}
