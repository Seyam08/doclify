import { Button } from "@/components/ui/button";
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
    tags: ["Motivation", "Consistency", "Habits", "Success"],
  },
  content: `<h1>Welcome to Doclify ✨</h1><p>Doclify is a minimal, modern blogging platform designed to help you write and publish your ideas effortlessly. This editor is powered by <strong>Tiptap</strong>, giving you a smooth and flexible writing experience with rich formatting options.</p><hr><ul><li><p>Format your text using <strong>bold</strong>, <em>italic</em>, or <u>underline</u></p></li><li><p>Create structured content using headings and subheadings</p></li><li><p>Build ordered and unordered lists</p></li><li><p>Add blockquotes, links, code blocks, or images</p></li><li><p>Experiment with rich content to see how it renders on Doclify</p></li></ul><blockquote><p>“Good writing begins with clarity. Doclify helps you stay focused, organized, and expressive — one word at a time.”</p></blockquote><ol><li><p>Format your text using <strong>bold</strong>, <em>italic</em>, or <u>underline</u></p></li><li><p>Create structured content using headings and subheadings</p></li><li><p>Build ordered and unordered lists</p></li><li><p>Add blockquotes, links, code blocks, or images</p></li><li><p>Experiment with rich content to see how it renders on Doclify</p></li></ol><h2>Through this situation</h2><hr><p>“<strong>Through this situation,</strong> <em>I think employees saw the true colour of businesses, of how they treated their people,</em>” he added. “Employers that may not have handled it the right <s>away</s> are still feeling the repercussions. We had to re-educate our managers to think, it’s all new - how do we work through this? In the beginning, a lot of people tried to remotely replicate culture from what was in an office environment. However, we eventually had to look at things in a different way and redefine what culture is to a workplace.”</p><p></p><pre><code class="language-typescriptreact"> const [content, setContent] = useState&lt;string&gt;();
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

      {/* tags and share section  */}
      <div className="flex flex-nowrap flex-row items-start md:items-center justify-between my-4 md:my-8">
        {/* tags  */}
        <div>
          <TypographyP className="mb-2">Tags:</TypographyP>
          <div className="flex flex-wrap gap-2">
            {post.frontMatter.tags.map((tag, index) => (
              <div className="border border-ring px-2 py-1" key={index}>
                <UnderlineLink href={`/#`} className="text-sm text-primary">
                  # {tag}
                </UnderlineLink>
              </div>
            ))}
          </div>
        </div>

        {/* share  */}
        <div>
          <TypographyP className="mb-2">Share:</TypographyP>
          <div className="flex flex-wrap gap-4 mt-2">
            {/* facebook  */}
            <Button variant="outline" size="icon">
              <svg viewBox="0 0 666.667 666.667">
                <defs>
                  <clipPath
                    id="facebook_icon__a"
                    clipPathUnits="userSpaceOnUse"
                  >
                    <path d="M0 700h700V0H0Z" />
                  </clipPath>
                </defs>
                <g
                  clipPath="url(#facebook_icon__a)"
                  transform="matrix(1.33333 0 0 -1.33333 -133.333 800)"
                >
                  <path
                    d="M0 0c0 138.071-111.929 250-250 250S-500 138.071-500 0c0-117.245 80.715-215.622 189.606-242.638v166.242h-51.552V0h51.552v32.919c0 85.092 38.508 124.532 122.048 124.532 15.838 0 43.167-3.105 54.347-6.211V81.986c-5.901.621-16.149.932-28.882.932-40.993 0-56.832-15.528-56.832-55.9V0h81.659l-14.028-76.396h-67.631v-171.773C-95.927-233.218 0-127.818 0 0"
                    style={{
                      fill: "#0866ff",
                      fillOpacity: "1",
                      fillRule: "nonzero",
                      stroke: "none",
                    }}
                    transform="translate(600 350)"
                  />
                  <path
                    d="m0 0 14.029 76.396H-67.63v27.019c0 40.372 15.838 55.899 56.831 55.899 12.733 0 22.981-.31 28.882-.931v69.253c-11.18 3.106-38.509 6.212-54.347 6.212-83.539 0-122.048-39.441-122.048-124.533V76.396h-51.552V0h51.552v-166.242a250.559 250.559 0 0 1 60.394-7.362c10.254 0 20.358.632 30.288 1.831V0Z"
                    style={{
                      fill: "#fff",
                      fillOpacity: "1",
                      fillRule: "nonzero",
                      stroke: "none",
                    }}
                    transform="translate(447.918 273.604)"
                  />
                </g>
              </svg>
            </Button>
            {/* linkedin */}
            <Button variant="outline" size="icon">
              <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
                <path
                  d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                  fill="#0A66C2"
                />
              </svg>
            </Button>
            {/* x Twitter */}
            <Button variant="outline" size="icon">
              <svg fill="none" viewBox="0 0 1200 1227">
                <path
                  fill="#fff"
                  d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      {/* <Skeleton className="h-24 w-3/5 rounded-md" />
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-52 w-full rounded-md" />
      <Skeleton className="h-6 w-full rounded-md" />
      <Skeleton className="h-28 w-2/5 rounded-md" /> */}
    </div>
  );
}
