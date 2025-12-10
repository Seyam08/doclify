"use client";

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

export function DoclifyError({
  title,
  description,
  cta,
  className,
  status,
}: {
  cta?: ReactNode;
  status?: number;
  title?: string;
  description?: string;
} & ComponentProps<"div">) {
  const cardStatus = status ?? 500;
  const cardTitle = title ?? "Internal server error!";
  const cardDesc = description ?? "Something went wrong!";
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center",
        className
      )}
    >
      <div className="max-w-xl w-full md:w-4/5 flex flex-col">
        <Card className="w-full bg-[radial-gradient(circle_at_top_center,rgb(161,210,247,0.6),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_center,rgb(2,13,25,1),transparent_70%)] bg-fixed bg-background/60 backdrop-blur supports-backdrop-filter:bg-background/60">
          <CardHeader className="text-center">
            <div className="w-fit m-auto">
              <DoclifyFullLogo logoHref="/" />
            </div>
            <TypographyH1>{cardStatus}</TypographyH1>
            <CardTitle className="text-xl">{cardTitle}</CardTitle>
            <CardDescription>{cardDesc}</CardDescription>
          </CardHeader>
          {cta && <CardContent className="w-fit m-auto">{cta}</CardContent>}
        </Card>
      </div>
    </div>
  );
}
