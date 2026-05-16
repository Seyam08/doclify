import { NewsLetterForm } from "@/components/NewsLetter/NewsLetterForm";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function NewsLetter({ className }: ComponentProps<"div">) {
  return (
    <div className={cn(className)}>
      <div className="py-20 px-10 mx-auto flex flex-col md:flex-row items-stretch md:items-start justify-between gap-10 bg-background/30 backdrop-blur supports-backdrop-filter:bg-background/30">
        {/* Left Text Section */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <TypographyH1>
            Subscribe to our <br /> monthly newsletter
          </TypographyH1>
          <TypographyP className="text-sm max-w-md">
            Stay up-to-date about latest tech and new world. <br />
            Unsubscribe at anytime!
          </TypographyP>
        </div>

        {/* Right Form Section */}
        <NewsLetterForm className="flex-1 max-w-md" />
      </div>
    </div>
  );
}
