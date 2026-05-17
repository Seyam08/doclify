import FeaturedPosts from "@/components/DoclifySections/FeaturedPosts";
import NewsLetter from "@/components/DoclifySections/NewsLetter";
import TopCategories from "@/components/DoclifySections/TopCategories";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className={cn("width-holder", "space-y-20")}>
      <section className="content-holder py-10 md:py-16">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <p className="ollyo-kicker animate-fade-down animate-duration-700">
              Doclify journal
            </p>
            <TypographyH1 className="ollyo-display animate-fade-down animate-duration-700">
              Sharing ideas, stories, and lessons.
            </TypographyH1>
          </div>

          <div className="ollyo-section-panel border border-[#DDDDDD] p-8 animate-fade-up animate-duration-700">
            <TypographyP className="ollyo-lead">
              Share your knowledge, tell your stories, or explore what others
              are writing.
            </TypographyP>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button asChild>
                <Link href="/login">
                  Start writing
                  <ArrowUpRight />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/blog">Browse blogs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Separator className="h-px w-full bg-black/20" />

      {/* latest post */}

      <section>
        <FeaturedPosts title="Latest Blogs" limit={3} />
      </section>

      <Separator className="h-px w-full bg-black/20" />

      {/* categories */}
      <section>
        <TopCategories title="Top Categories" limit={6} />
      </section>

      <Separator className="h-px w-full bg-black/20" />

      {/* newsletter */}
      <section>
        <NewsLetter />
      </section>
    </section>
  );
}
