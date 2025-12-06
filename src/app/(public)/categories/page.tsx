import { getDetailedPostMeta, MetaStats } from "@/actions/post/post-actions";
import { DoclifyItem } from "@/components/DoclifyItem/DoclifyItem";
import { TypographyH2 } from "@/components/ui/typography";
import { ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories of Doclify",
  description: "Doclify",
};

export default async function page() {
  const response = await getDetailedPostMeta("categories");

  if (response.success === false) {
    return (
      <div className="m-auto">
        <TypographyH2 className="mb-14 capitalize">
          {response.message}
        </TypographyH2>
      </div>
    );
  } else {
    const categories = response.content as MetaStats;

    return (
      <div>
        <TypographyH2 className="mb-14 capitalize">All Categories</TypographyH2>

        {/* each item */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
        {/* post horizontal */}
      </div>
    );
  }
}
