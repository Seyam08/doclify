import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export function TypographyH1({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-2xl md:text-4xl font-extrabold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function TypographyP({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-muted-foreground text-sm md:text-base leading-7",
        className
      )}
    >
      {children}
    </p>
  );
}

export default function UnderlineLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group relative", className)}>
      <span>{children}</span>
      <span className="absolute -bottom-0.5 left-0 w-0 transition-all h-[0.2] bg-primary group-hover:w-full"></span>
    </Link>
  );
}
