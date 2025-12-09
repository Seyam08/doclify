import { getAllAuthor } from "@/actions/author/author-action";
import { DoclifyAuthorCard } from "@/components/DoclifyAuthor/DoclifyAuthor";
import { TypographyH2 } from "@/components/ui/typography";
import { AuthorType } from "@/types/schema.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "All Authors",
  description: "Doclify",
};

export default async function Page() {
  const response = await getAllAuthor();

  if (response.success === false) {
    return notFound();
  } else {
    const authors = response.content as AuthorType[];
    return (
      <div>
        <TypographyH2 className="mb-14">All Authors</TypographyH2>
        {authors?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {authors.map((author) => (
              <DoclifyAuthorCard
                author={author}
                key={author.username}
                username={author.username}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
