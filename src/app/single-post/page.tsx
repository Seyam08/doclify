import { Skeleton } from "@/components/ui/skeleton";
import UnderlineLink, {
  TypographyH1,
  TypographyP,
} from "@/components/ui/typography";
import { Calendar1Icon, ClockFading, User } from "lucide-react";

const post = {
  slug: "the-power-of-consistency",
  frontMatter: {
    title: "The Power of Consistency",
    description:
      "Consistency is the secret ingredient behind long-term success. Small steps every day build massive results.",
    image: "/images/blog/demo-consistency.jpg",
    date: "2024-05-12T10:30:00+06:00",
    featured: true,
    postOfTheMonth: false,
    author: "John Doe",
    categories: ["Self Improvement", "Productivity"],
    tags: ["Motivation", "Consistency", "Habits"],
  },
  content:
    "\n### Consistency beats intensity\nA lot of people believe success requires huge bursts of effort. But in reality, the people who win long-term are the ones who stay consistent.\n\nEven if the progress seems small each day, it compounds. Just like saving money, little habits build big results over time.\n\n### Small habits matter\nWhen you commit to something every day—even for five minutes—you train your brain to show up. Showing up becomes a habit, not a decision.\n\n> Success doesn’t come from what you do occasionally. It comes from what you do consistently.\n\n### How to stay consistent\nHere are a few simple tactics:\n\n- Start small\n- Set achievable goals\n- Track your daily progress\n- Don’t break the chain\n\nConsistency isn’t glamorous, but it works. And the longer you stick with it, the more unstoppable you become.",
};

export default function Page() {
  return (
    <div className="content-holder space-y-2">
      {/* categories and reading time section */}
      <p className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
        <ClockFading className="h-4 w-4 mr-2" />
        02 min reading in<span className="mx-2">—</span>
        {post.frontMatter.categories.map((category, index) => (
          <span key={index}>
            <UnderlineLink href="#">{category}</UnderlineLink>
            {index < post.frontMatter.categories.length - 1 && (
              <span className="mx-1">,</span>
            )}
          </span>
        ))}
      </p>

      {/* heading section */}
      <TypographyH1 className="my-3 md:my-6">
        {post.frontMatter.title}
      </TypographyH1>

      {/* description section */}
      <TypographyP className="my-1 md:my-2">
        {post.frontMatter.description}
      </TypographyP>

      {/* Author and Date info section */}
      <div className="my-1 md:my-2">
        <p className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
          <User className="h-4 w-4 mr-2" />
          <span>
            by{" "}
            <UnderlineLink href="#" className="text-accent-foreground">
              {post.frontMatter.author}
            </UnderlineLink>
          </span>
          <span className="mx-2">—</span>
          <Calendar1Icon className="h-4 w-4 mr-2" />
          Published at{" "}
          {new Date(post.frontMatter.date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <Skeleton className="h-24 w-3/5 rounded-md" />
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-52 w-full rounded-md" />
      <Skeleton className="h-6 w-full rounded-md" />
      <Skeleton className="h-28 w-2/5 rounded-md" />
    </div>
  );
}
