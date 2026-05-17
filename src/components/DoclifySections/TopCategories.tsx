import { getDetailedPostMeta, MetaStats } from "@/actions/post/post-actions";
import { DoclifyItem } from "@/components/DoclifyItem/DoclifyItem";
import {
  TypographyH3,
  TypographyP,
  UnderlineLink02,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ExternalLinkIcon } from "lucide-react";
import { ComponentProps } from "react";

export default async function TopCategories({
  title,
  limit,
  className,
}: {
  limit: number;
  title: string;
} & ComponentProps<"div">) {
  const response = await getDetailedPostMeta("categories", limit);

  if (response.success === false) {
    return (
      <div className="m-auto text-center py-20">
        <TypographyH3 className="mb-14 capitalize">
          {response.message}
        </TypographyH3>
      </div>
    );
  } else {
    const categories = response.content as MetaStats;

    return (
      <div className={cn("w-full", className)}>
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="ollyo-kicker mb-4">Content map</p>
          <TypographyH3 className="ollyo-section-title mx-auto w-fit capitalize">
            {title}
          </TypographyH3>

          <TypographyP className="ollyo-copy mx-auto mt-6 w-fit capitalize">
            Select a category to see more related content
          </TypographyP>
        </div>

        {/* each item */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {/* each item  */}
          {categories.map((category, index) => (
            <DoclifyItem
              key={index}
              link={`/categories/${category._id}`}
              icon={<ExternalLinkIcon className="size-4" />}
              title={category._id}
              number={category.count}
            />
          ))}
        </div>

        <div className="m-auto mt-14 w-fit">
          <UnderlineLink02
            href="/categories"
            className="ollyo-tag hover:text-[#5409DA]"
          >
            All Categories
            <ArrowUpRight className="h-5 w-5 group-hover:rotate-45 transition-all duration-300" />
          </UnderlineLink02>
        </div>
      </div>
    );
  }
}
