import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className={cn("width-holder", "py-0 pt-5 md:pt-10")}>
      {/* hero section */}
      <section className="content-holder space-y-10 py-28 px-5 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-12 w-6/12" />
        </div>
        <div className="w-full flex flex-col justify-center items-center space-y-2">
          <Skeleton className="h-8 w-11/12" />
          <Skeleton className="h-8 w-24" />
        </div>
      </section>
    </section>
  );
}
