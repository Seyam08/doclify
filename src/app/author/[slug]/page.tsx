import { getAuthor } from "@/actions/author/author-action";
import { getPostByAuthor } from "@/actions/post/post-actions";
import { DoclifySocialLinkShow } from "@/components/DoclifyItem/DoclifyItem";
import { DoclifyImage } from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { AuthorType, BlogType } from "@/types/schema.types";
import { SquarePen } from "lucide-react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const response = await getAuthor(slug);

  if (response.success === false) {
    return (
      <div className="m-auto">
        <TypographyH2 className="mb-14 capitalize">
          {response.message}
        </TypographyH2>
      </div>
    );
  } else {
    const author = response.content as AuthorType;
    const blogResponse = await getPostByAuthor(author.username);
    const blogs = blogResponse.content as BlogType[]; // blogs can be undefine or null
    const numberOfBlogs = blogs?.length; // number of blog can be undefine also, because of blog
    const socialLink = author.authorInfo.socialLinks; // social link can be an empty array

    return (
      <div className="content-holder flex flex-col items-center space-y-5">
        <div className="w-36 h-36">
          <DoclifyImage
            src={author.authorInfo.image}
            alt={author.authorInfo.name}
            height={200}
            width={200}
          />
        </div>
        <TypographyH3>{author.authorInfo.name}</TypographyH3>
        <TypographyP className="mt-0 align-middle">
          {blogResponse.success ? (
            <>
              <SquarePen className="inline-block h-4 w-4" /> {numberOfBlogs}{" "}
              Published posts
            </>
          ) : (
            blogResponse.message
          )}
        </TypographyP>
        {author.authorInfo.bio && (
          <TypographyP className="text-center">
            {author.authorInfo.bio}
          </TypographyP>
        )}
        {socialLink && socialLink.length > 0 && (
          <div className="max-w-full flex gap-3">
            {socialLink.map((item, index) => (
              <DoclifySocialLinkShow
                key={index}
                address={item.address}
                platform={item.platform}
                className="p-2"
              />
            ))}
          </div>
        )}
        <Separator className="my-5" />
      </div>
    );
  }
}
