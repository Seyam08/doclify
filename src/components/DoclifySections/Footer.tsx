import {
  Facebook,
  Linkedin,
  Twitter,
} from "@/components/DoclifyIcon/DoclifyIcon";
import { Button } from "@/components/ui/button";
import {
  TypographyP,
  UnderlineLink,
  UnderlineLink02,
} from "@/components/ui/typography";
import Link from "next/link";

const authorLink = process.env.AUTHOR_LINK as string;

export default function Footer() {
  return (
    <footer className="w-full py-10">
      <div className="mx-auto flex w-full max-w-[1110px] flex-col-reverse items-center justify-between gap-8 px-4 text-sm md:flex-row md:px-10">
        <div>
          <TypographyP className="whitespace-nowrap">
            (C) 2025 Doclify. All rights reserved.
          </TypographyP>
          <TypographyP className="flex justify-center text-sm md:justify-start">
            Developed by
            <UnderlineLink02
              href={authorLink}
              className="ml-1 text-sm text-[#9FFA62]"
            >
              Seyam
            </UnderlineLink02>
          </TypographyP>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <UnderlineLink href="/coming-soon">Terms of service</UnderlineLink>
          <UnderlineLink href="/coming-soon">Privacy policy</UnderlineLink>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Follow:</span>

          <Button variant="ghost" size="sm" asChild>
            <Link href="#" aria-label="Facebook">
              <Facebook />
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter />
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
