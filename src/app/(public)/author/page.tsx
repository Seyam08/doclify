import { getAllAuthor } from "@/actions/author/author-action";
import { DoclifyBreadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { DoclifyAuthorCard } from "@/components/DoclifyAuthor/DoclifyAuthor";
import { DoclifyAuthorCardSkeleton } from "@/components/DoclifyCards/DoclifyCardsSkeleton";
import { TypographyH2 } from "@/components/ui/typography";
import { AuthorType } from "@/types/schema.types";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const response = await getAllAuthor();

  if (response.success === false) {
    return notFound();
  } else {
    return {
      title: "All Authors",
      description: "Doclify Authors",
    };
  }
}

export default async function Page() {
  "use cache";
  cacheLife("days");
  cacheTag("doclify-authors");

  const response = await getAllAuthor();

  if (response.success === false) {
    return notFound();
  } else {
    const authors = response.content as AuthorType[];
    return (
      <div>
        <div className="ollyo-page-heading">
          <TypographyH2 className="ollyo-page-title">All Authors</TypographyH2>
          <DoclifyBreadcrumb />
        </div>

        {authors?.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
