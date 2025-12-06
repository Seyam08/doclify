import { TypographyH2 } from "@/components/ui/typography";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TypographyH2 className="z-50">
        this is form public route group
      </TypographyH2>
      {children}
    </div>
  );
}
