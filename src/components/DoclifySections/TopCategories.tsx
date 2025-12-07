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
  const response = await getDetailedPostMeta("categories", 6);

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
        <TypographyH3 className="w-fit capitalize mx-auto mb-2">
          {title}
        </TypographyH3>

        <TypographyP className="w-fit capitalize mx-auto mb-14">
          Select a category to see more related content
        </TypographyP>

        {/* each item */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
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

        <div className="m-auto w-fit mt-14">
          <UnderlineLink02 href="/categories">
            All Categories
            <ArrowUpRight className="h-5 w-5 group-hover:rotate-45 transition-all duration-300" />
          </UnderlineLink02>
        </div>
      </div>
    );
  }
}
