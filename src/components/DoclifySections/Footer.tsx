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
    <footer className="bg-accent w-full py-6">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6 text-sm">
        {/* Left copyright */}
        <div>
          <TypographyP className="whitespace-nowrap">
            © 2025 Doclify. All rights reserved.
          </TypographyP>
          <TypographyP className="flex justify-center md:justify-start text-sm">
            Developed by
            <UnderlineLink02
              href={authorLink}
              className="ml-1 text-sm text-accent-foreground"
            >
              Seyam
            </UnderlineLink02>
          </TypographyP>
        </div>

        {/* Center links */}
        <div className="flex items-center gap-10">
          <UnderlineLink href="/coming-soon">Terms of service</UnderlineLink>
          <UnderlineLink href="/coming-soon">Privacy policy</UnderlineLink>
        </div>

        {/* Right socials */}
        <div className="flex items-center gap-2">
          <span className="font-medium text-muted-foreground">Follow:</span>

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
