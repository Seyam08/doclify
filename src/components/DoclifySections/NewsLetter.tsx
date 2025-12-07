import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
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
        <div className="flex-1 flex flex-col gap-5 max-w-md">
          <div className="flex flex-col gap-3">
            <Input id="name" type="text" placeholder="Name" />
          </div>

          <div className="flex flex-col gap-3">
            <Input id="email" type="email" placeholder="Your email address" />
          </div>

          <Button
            variant="outline"
            className="flex items-center justify-between group"
          >
            Subscribe Now
            <ArrowUpRight className="h-6 w-6 group-hover:rotate-45 transition-all duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}
