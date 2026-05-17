import { DoclifyFullLogo } from "@/components/DoclifyLogo/DoclifyLogo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

export function DoclifyNotFound({
  title,
  description,
  cta,
  className,
}: {
  cta?: ReactNode;
  title?: string;
  description?: string;
} & ComponentProps<"div">) {
  const cardTitle = title ?? "Not Found";
  const cardDesc = description ?? "There is no content in this route";
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
            <TypographyH1 className="ollyo-display">404</TypographyH1>
            <CardTitle className="ollyo-card-title">{cardTitle}</CardTitle>
            <CardDescription>{cardDesc}</CardDescription>
          </CardHeader>
          {cta && <CardContent className="w-fit m-auto">{cta}</CardContent>}
        </Card>
      </div>
    </div>
  );
}
