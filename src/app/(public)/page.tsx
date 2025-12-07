import FeaturedPosts from "@/components/DoclifySections/FeaturedPosts";
import { TypographyH1, TypographyP } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="width-holder">
      {/* hero section */}
      <div className="content-holder m-auto space-y-10 py-36 px-5 text-center">
        <TypographyH1 className="text-3xl md:text-5xl animate-fade-down animate-duration-700">
          Sharing ideas, stories, and
          <br /> lessons along the way
        </TypographyH1>
        <TypographyP className="text-base md:text-xl animate-fade-up animate-duration-700">
          Share your knowledge, tell your stories, or explore what others are
          writing. Everyone is welcome.
        </TypographyP>
      </div>

      {/* featured post */}
      <div>
        <FeaturedPosts title="Featured Blogs" limit={3} />
      </div>
    </div>
  );
}
