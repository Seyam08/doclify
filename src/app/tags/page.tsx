import { getDetailedPostMeta, MetaStats } from "@/actions/post/post-actions";
import { DoclifyItem } from "@/components/DoclifyItem/DoclifyItem";
import { TypographyH2 } from "@/components/ui/typography";
import { ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags of Doclify",
  description: "Doclify",
};

export default async function page() {
  const response = await getDetailedPostMeta("tags");

  if (response.success === false) {
    return (
      <div className="m-auto">
        <TypographyH2 className="mb-14 capitalize">
          {response.message}
        </TypographyH2>
      </div>
    );
  } else {
    const tags = response.content as MetaStats;

    return (
      <div>
        <TypographyH2 className="mb-14 capitalize">All Tags</TypographyH2>

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
