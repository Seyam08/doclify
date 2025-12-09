import FeaturedPosts from "@/components/DoclifySections/FeaturedPosts";
import NewsLetter from "@/components/DoclifySections/NewsLetter";
import TopCategories from "@/components/DoclifySections/TopCategories";
import { Separator } from "@/components/ui/separator";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className={cn("width-holder", "py-0 pt-5 md:pt-10")}>
      {/* hero section */}
      <section className="content-holder m-auto space-y-10 py-28 px-5 text-center">
        <TypographyH1 className="text-3xl md:text-5xl animate-fade-down animate-duration-700">
          Sharing ideas, stories, and
          <br className="hidden md:inline-flex" /> lessons along the way
        </TypographyH1>
        <TypographyP className="text-base md:text-xl animate-fade-up animate-duration-700">
          Share your knowledge, tell your stories, or explore what others are
          writing. Everyone is welcome.
        </TypographyP>
      </section>

      <Separator className="w-full h-1" />

      {/* latest post */}

      <section className="py-10">
        <FeaturedPosts title="Latest Blogs" limit={3} />
      </section>

      <Separator className="w-full h-1" />

      {/* categories */}
      <section className="py-10">
        <TopCategories title="Top Categories" limit={6} />
      </section>

      <Separator className="w-full h-1" />

      {/* newsletter */}
      <section>
        <NewsLetter />
      </section>
    </section>
  );
}
