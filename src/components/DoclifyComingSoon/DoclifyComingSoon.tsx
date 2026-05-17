import { DoclifyFullLogo } from "@/components/DoclifyLogo/DoclifyLogo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

export function DoclifyComingSoon01({
  cta,
  className,
}: { cta?: ReactNode } & ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center",
        className
      )}
    >
      <div className="flex w-full max-w-xl flex-col md:w-4/5">
        <Card className="ollyo-section-panel w-full border border-[#DDDDDD] bg-white/60">
          <CardHeader className="text-center">
            <div className="w-fit m-auto">
              <DoclifyFullLogo logoHref="/" />
            </div>
            <CardTitle className="ollyo-card-title">Coming Soon</CardTitle>
            <CardDescription>
              This feature is currently under development. It will be released
              soon.
            </CardDescription>
          </CardHeader>
          {cta && <CardContent className="w-fit m-auto">{cta}</CardContent>}
        </Card>
      </div>
    </div>
  );
}
