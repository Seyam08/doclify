"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { TypographyP, UnderlineLink03 } from "@/components/ui/typography";
import { House, Slash } from "lucide-react";
import { usePathname } from "next/navigation";

export function DoclifyBreadcrumb({ removeLast = 0 }: { removeLast?: number }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const visibleSegments =
    removeLast > 0 ? segments.slice(0, -removeLast) : segments;

  const crumbs = visibleSegments.map((seg, i) => {
    const href = "/" + visibleSegments.slice(0, i + 1).join("/");
    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    const decodedLabel = decodeURIComponent(label);

    return { href, label: decodedLabel };
  });
  const lastItem = crumbs.length - 1;

  return (
    <Breadcrumb>
      <BreadcrumbList className="gap-0.5 sm:gap-0.5">
        <BreadcrumbItem>
          <House className="h-4 w-4" />
          <BreadcrumbLink asChild>
            <UnderlineLink03 href="/" className="text-foreground">
              Home
            </UnderlineLink03>
          </BreadcrumbLink>
          <div className="[&>svg]:size-3.5">
            <Slash className="-rotate-12" />
          </div>
        </BreadcrumbItem>
        {crumbs.map((item, index) => (
          <BreadcrumbItem key={index}>
            <BreadcrumbLink asChild>
              {lastItem !== index ? (
                <UnderlineLink03 href={item.href} className="text-foreground">
                  {item.label}
                </UnderlineLink03>
              ) : (
                <TypographyP>{item.label}</TypographyP>
              )}
            </BreadcrumbLink>
            {lastItem !== index && (
              <div className="[&>svg]:size-3.5">
                <Slash className="-rotate-12" />
              </div>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
