import { getDetailedPostMeta, MetaStats } from "@/actions/post/post-actions";
import { DoclifyBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { DoclifyItem } from "@/components/DoclifyItem/DoclifyItem";
import { TypographyH2 } from "@/components/ui/typography";
import { ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Tags of Doclify",
  description: "Doclify",
};

export default async function page() {
  const response = await getDetailedPostMeta("tags");

  if (response.success === false) {
    return notFound();
  } else {
    const tags = response.content as MetaStats;

    return (
      <div>
        <div className="flex justify-between items-center mb-14">
          <TypographyH2 className="capitalize">All Tags</TypographyH2>
          <DoclifyBreadcrumb />
        </div>

        {/* each item */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {/* each item  */}
          {tags.map((tag, index) => (
            <DoclifyItem
              key={index}
              link={`/tags/${tag._id}`}
              icon={<ExternalLinkIcon className="size-4" />}
              title={tag._id}
              number={tag.count}
            />
          ))}
        </div>
        {/* post horizontal */}
      </div>
    );
  }
}
