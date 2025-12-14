import { getAllAuthor } from "@/actions/author/author-action";
import { DoclifyBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { DoclifyAuthorCard } from "@/components/DoclifyAuthor/DoclifyAuthor";
import { DoclifyAuthorCardSkeleton } from "@/components/DoclifyCards/DoclifyCardsSkeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { AuthorType } from "@/types/schema.types";
import { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "All Authors",
  description: "Doclify",
};

export default async function Page() {
  "use cache";
  cacheLife("hours");

  const response = await getAllAuthor();

  if (response.success === false) {
    return notFound();
  } else {
    const authors = response.content as AuthorType[];
    return (
      <div>
        <div className="flex justify-between items-center mb-14">
          <TypographyH2>All Authors</TypographyH2>
          <DoclifyBreadcrumb />
        </div>

        {authors?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {authors.map((author) => (
              <Suspense
                fallback={<DoclifyAuthorCardSkeleton />}
                key={author.username}
              >
                <DoclifyAuthorCard author={author} username={author.username} />
              </Suspense>
            ))}
          </div>
        )}
      </div>
    );
  }
}
