import { getDetailedPostMeta, MetaStats } from "@/actions/post/post-actions";
import { DoclifyBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { DoclifyItem } from "@/components/DoclifyItem/DoclifyItem";
import { TypographyH2 } from "@/components/ui/typography";
import { ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Categories of Doclify",
  description: "Doclify",
};

export default async function page() {
  "use cache";
  cacheLife("hours");
  const response = await getDetailedPostMeta("categories");

  if (response.success === false) {
    return notFound();
  } else {
    const categories = response.content as MetaStats;

    return (
      <div>
        <div className="flex justify-between items-center mb-14">
          <TypographyH2 className="capitalize">All Categories</TypographyH2>
          <DoclifyBreadcrumb />
        </div>

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
