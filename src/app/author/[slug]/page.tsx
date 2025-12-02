import { TypographyH2 } from "@/components/ui/typography";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <TypographyH2>{slug}</TypographyH2>;
}
