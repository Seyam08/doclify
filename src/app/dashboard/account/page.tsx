"use client";
import { Button } from "@/components/ui/button";
import { MinimalTiptap } from "@/components/ui/editor";
import { useState } from "react";

export default function Page() {
  const [content, setContent] = useState<string>(`
   <h1>Welcome to Doclify ✨</h1>
<p>
   Doclify is a minimal, modern blogging platform designed to help you write and publish your ideas effortlessly. 
   This editor is powered by <strong>Tiptap</strong>, giving you a smooth and flexible writing experience with rich formatting options.
</p>
<hr/>

<ul>
   <li>Format your text using <strong>bold</strong>, <em>italic</em>, or <u>underline</u></li>
   <li>Create structured content using headings and subheadings</li>
   <li>Build ordered and unordered lists</li>
   <li>Add blockquotes, links, code blocks, or images</li>
   <li>Experiment with rich content to see how it renders on Doclify</li>
</ul>

<blockquote>
   <p>
      “Good writing begins with clarity. Doclify helps you stay focused, organized, and expressive
      — one word at a time.”
   </p>
</blockquote>

  `);

  return (
    <div className="size-full flex flex-col items-center justify-center p-4 space-y-3">
      <div className="w-full max-w-full">
        <MinimalTiptap
          content={content}
          onChange={setContent}
          placeholder="Start typing your content here..."
          className="min-h-[400px]"
        />
      </div>
      <Button variant="outline" onClick={() => {}}>
        Save
      </Button>
    </div>
  );
}
