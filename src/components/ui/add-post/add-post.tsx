"use client";
import { Button } from "@/components/ui/button";
import { MinimalTiptap } from "@/components/ui/editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";

const initialContent = `
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
    
      `;

export default function AddPost() {
  const [content, setContent] = useState<string>(initialContent);
  const [html, setHtml] = useState<string>();

  const handleSave = () => {
    setHtml(content);
    console.log(content);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen max-w-full rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={50}>
        <div className="h-full p-3">
          <div className="size-full flex flex-col items-start space-y-3">
            <div className="w-full max-w-full">
              <MinimalTiptap
                content={content}
                onChange={setContent}
                placeholder="Start typing your content here..."
                className="min-h-96"
              />
            </div>
            <Button variant="outline" onClick={handleSave}>
              Preview
            </Button>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="h-full p-3">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Preview
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: html || "" }}
            className="tiptap"
          ></div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
