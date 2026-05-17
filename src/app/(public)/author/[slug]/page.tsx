import { getAllAuthor, getAuthor } from "@/actions/author/author-action";
import { getPostByAuthor } from "@/actions/post/post-actions";
import { DoclifyBlogCard } from "@/components/DoclifyCards/DoclifyCards";
import { DoclifySocialLinkShow } from "@/components/DoclifyItem/DoclifyItem";
import { DoclifyImage } from "@/components/ui/image";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { AuthorType, BlogType } from "@/types/schema.types";
import { Sparkles, SquarePen } from "lucide-react";
import { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await getAllAuthor();

  if (response.success === false) {
    return ["user"];
  } else {
    const authors = response.content as AuthorType[];
    return authors.map((author) => ({
      slug: author.username,
    }));
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // fetch post information
  const response = await getAuthor(slug);

  if (response.success === true) {
    const author = response.content as AuthorType;
    return {
      title: author.authorInfo.name,
      description: "Doclify Author",
    };
  } else {
    return {
      title: "Author Not Found",
      description: "Doclify",
    };
  }
}

export default async function page({ params }: Props) {
  "use cache";
  cacheLife("days");
  cacheTag("doclify-single-author");

  const { slug } = await params;
  const response = await getAuthor(slug);

  if (response.success === false) {
    return notFound();
  } else {
    const author = response.content as AuthorType;
    const blogResponse = await getPostByAuthor(author.username);
    const blogs = blogResponse.content as BlogType[]; // blogs can be undefine or null
    const numberOfBlogs = blogs?.length; // number of blog can be undefine also, because of blog
    const socialLink = author.authorInfo.socialLinks; // social link can be an empty array

    return (
      <>
        <div className="content-holder ollyo-section-panel flex flex-col items-center space-y-5 border border-[#DDDDDD] p-8 text-center">
          <div className="h-36 w-36 border border-[#DDDDDD]">
            <DoclifyImage
              src={author.authorInfo.image}
              alt={author.authorInfo.name}
              height={200}
              width={200}
              className="rounded-none"
            />
          </div>
          <TypographyH3 className="ollyo-section-title">
            {author.authorInfo.name}
          </TypographyH3>
          <TypographyP className="ollyo-meta mt-0 align-middle">
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
            <TypographyP className="ollyo-copy max-w-2xl text-center">
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
          <Separator className="my-5 bg-black/20" />
        </div>
        {/* post of author  */}
        <div className="m-auto mt-16">
          <TypographyH3 className="ollyo-kicker text-center">
            Post of
          </TypographyH3>

          <TypographyH2 className="ollyo-page-title mb-10 flex items-center justify-center gap-5 text-center">
            <Sparkles className="h-5 w-5 fill-[#9FFA62]" />

            {author.authorInfo.name}

            <Sparkles className="h-5 w-5 fill-[#9FFA62]" />
          </TypographyH2>
          {/* each item */}
          {blogs ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {/* each item  */}
              {blogs.map((blog) => (
                <DoclifyBlogCard blog={blog} key={blog.slug} />
              ))}
            </div>
          ) : (
            <div className="m-auto">
              <TypographyH2 className="ollyo-page-title mb-14 capitalize">
                This user doesn&apos;t have any Blog
              </TypographyH2>
            </div>
          )}
        </div>
      </>
    );
  }
}
