import { DoclifyImageWithSkeleton } from "@/components/ui/image";
import UnderlineLink, {
  TypographyH1,
  TypographyP,
} from "@/components/ui/typography";
import { Calendar1Icon, ClockFading, User } from "lucide-react";

const post = {
  slug: "the-power-of-consistency",
  frontMatter: {
    title: "The Power of Consistency",
    description:
      "Consistency is the secret ingredient behind long-term success. Small steps every day build massive results.",
    image:
      "https://plus.unsplash.com/premium_photo-1674489620667-eaf4a0094996?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "2024-05-12T10:30:00+06:00",
    featured: true,
    postOfTheMonth: false,
    author: "John Doe",
    categories: ["Self Improvement", "Productivity"],
    tags: ["Motivation", "Consistency", "Habits"],
  },
  content: `<h1>Welcome to Doclify ✨</h1><p>Doclify is a minimal, modern blogging platform designed to help you write and publish your ideas effortlessly. This editor is powered by <strong>Tiptap</strong>, giving you a smooth and flexible writing experience with rich formatting options.</p><hr><ul><li><p>Format your text using <strong>bold</strong>, <em>italic</em>, or <u>underline</u></p></li><li><p>Create structured content using headings and subheadings</p></li><li><p>Build ordered and unordered lists</p></li><li><p>Add blockquotes, links, code blocks, or images</p></li><li><p>Experiment with rich content to see how it renders on Doclify</p></li></ul><blockquote><p>“Good writing begins with clarity. Doclify helps you stay focused, organized, and expressive — one word at a time.”</p></blockquote><ol><li><p>Format your text using <strong>bold</strong>, <em>italic</em>, or <u>underline</u></p></li><li><p>Create structured content using headings and subheadings</p></li><li><p>Build ordered and unordered lists</p></li><li><p>Add blockquotes, links, code blocks, or images</p></li><li><p>Experiment with rich content to see how it renders on Doclify</p></li></ol><h2>Through this situation</h2><hr><p>“<strong>Through this situation,</strong> <em>I think employees saw the true colour of businesses, of how they treated their people,</em>” he added. “Employers that may not have handled it the right <s>away</s> are still feeling the repercussions. We had to re-educate our managers to think, it’s all new - how do we work through this? In the beginning, a lot of people tried to remotely replicate culture from what was in an office environment. However, we eventually had to look at things in a different way and redefine what culture is to a workplace.”</p><p></p><pre><code class="language-typescriptreact"> const [content, setContent] = useState&lt;string&gt;initialContent);
  const [html, setHtml] = useState&lt;string&gt;();

  const handleSave = () =&gt; {
    setHtml(content);
    console.log(content);
  };</code></pre><p></p>`,
};

export default function Page() {
  return (
    <div className="content-holder space-y-2">
      {/* categories and reading time section */}
      <p className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
        <ClockFading className="h-4 w-4 mr-2" />
        02 min reading in<span className="mx-2">—</span>
        {post.frontMatter.categories.map((category, index) => (
          <span key={index}>
            <UnderlineLink href="#">{category}</UnderlineLink>
            {index < post.frontMatter.categories.length - 1 && (
              <span className="mx-1">,</span>
            )}
          </span>
        ))}
      </p>

      {/* heading section */}
      <TypographyH1 className="my-3 md:my-6">
        {post.frontMatter.title}
      </TypographyH1>

      {/* description section */}
      <TypographyP className="my-1 md:my-2">
        {post.frontMatter.description}
      </TypographyP>

      {/* Author and Date info section */}
      <div className="my-1 md:my-2">
        <p className="flex items-center justify-start mb-4 text-primary text-sm md:text-base">
          <User className="h-4 w-4 mr-2" />
          <span>
            by{" "}
            <UnderlineLink href="#" className="text-accent-foreground">
              {post.frontMatter.author}
            </UnderlineLink>
          </span>
          <span className="mx-2">—</span>
          <Calendar1Icon className="h-4 w-4 mr-2" />
          Published at{" "}
          {new Date(post.frontMatter.date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* thumbnail image section */}
      <div className="my-2 md:my-8">
        <DoclifyImageWithSkeleton
          src={post.frontMatter.image}
          alt={post.frontMatter.title}
          width={1050}
          height={400}
        />
      </div>

      {/* post content section  */}
      <div
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
        className="tiptap"
      ></div>
      {/* <Skeleton className="h-24 w-3/5 rounded-md" />
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-52 w-full rounded-md" />
      <Skeleton className="h-6 w-full rounded-md" />
      <Skeleton className="h-28 w-2/5 rounded-md" /> */}
    </div>
  );
}
