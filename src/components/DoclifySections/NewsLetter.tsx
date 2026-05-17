import { NewsLetterSkeleton } from "@/components/DoclifySkeleton/DoclifySkeleton";
import { NewsLetterForm } from "@/components/NewsLetter/NewsLetterForm";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ComponentProps, Suspense } from "react";

export default function NewsLetter({ className }: ComponentProps<"div">) {
  return (
    <div className={cn(className)}>
      <div className="ollyo-section-panel mx-auto flex flex-col items-stretch justify-between gap-10 border border-[#DDDDDD] px-6 py-12 md:flex-row md:items-start md:px-10 md:py-16">
        {/* Left Text Section */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <p className="ollyo-kicker">Monthly dispatch</p>
          <TypographyH1 className="ollyo-section-title">
            Subscribe to our <br /> monthly newsletter
          </TypographyH1>
          <TypographyP className="ollyo-copy max-w-md">
            Stay up-to-date about latest tech and new world. <br />
            Unsubscribe at anytime!
          </TypographyP>
        </div>

        {/* Right Form Section */}
        <Suspense fallback={<NewsLetterSkeleton className="flex-1 max-w-md" />}>
          <NewsLetterForm className="flex-1 max-w-md" />
        </Suspense>
      </div>
    </div>
  );
}
