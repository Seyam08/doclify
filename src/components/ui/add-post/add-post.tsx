"use client";
import AddPostContainer from "@/components/ui/add-post/add-post-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MinimalTiptap } from "@/components/ui/editor";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { contentPurify } from "@/lib/utils";
import { addPostSchema } from "@/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleMinus, Eye, Save } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

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
  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof addPostSchema>) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Do something with the form values.
    console.log(data);
    form.reset();
  }

  function handleSave() {
    const cleanContent = contentPurify(content);
    setHtml(cleanContent);
  }

  return (
    <AddPostContainer
      editorPanel={
        <div className="h-full p-3">
          <div className="size-full flex flex-col items-start">
            <div className="w-full max-w-full h-screen overflow-y-auto">
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="title"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="post-title">Blog Title</FieldLabel>
                        <Input
                          {...field}
                          id="post-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Choose a concise and descriptive title"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="post-description">
                          Description
                        </FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            id="post-description"
                            placeholder="Provide a brief summary of your blog post."
                            rows={6}
                            className="min-h-24 resize-none"
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums">
                              {field.value.length}/200 characters
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name="thumbnail"
                    render={({ field, fieldState }) => {
                      const { onChange } = field;
                      const selectedFile = field.value;
                      const fileUrl = selectedFile
                        ? URL.createObjectURL(selectedFile)
                        : null;
                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Thumbnail</FieldLabel>

                          {fileUrl ? (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Avatar className="w-full h-52 cursor-pointer rounded-2xl">
                                  <AvatarImage
                                    src={fileUrl}
                                    alt={selectedFile?.name}
                                  />
                                  <AvatarFallback>
                                    <Skeleton className="w-full h-52" />
                                  </AvatarFallback>
                                </Avatar>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-1">
                                <Button
                                  size="sm"
                                  className="bg-red-400 hover:bg-red-500 transition-all cursor-pointer text-white shadow-xs"
                                  onClick={() => {
                                    form.setValue("thumbnail", undefined);
                                  }}
                                >
                                  <CircleMinus />
                                </Button>
                              </PopoverContent>
                            </Popover>
                          ) : (
                            <Input
                              id="avatar"
                              type="file"
                              onChange={(e) => onChange(e.target.files?.[0])}
                            />
                          )}

                          <FieldDescription>
                            {selectedFile
                              ? selectedFile?.name
                              : "Maintain aspect ratio 16:9. Max size 2MB. JPG or PNG."}
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>

                <MinimalTiptap
                  content={content}
                  onChange={setContent}
                  placeholder="Start typing your content here..."
                  className="min-h-96 my-4"
                />
                <Field orientation="horizontal" className="mt-5">
                  <Button variant="outline" type="submit">
                    {form.formState.isSubmitting ? (
                      <Spinner />
                    ) : (
                      <Save className="size-4" />
                    )}
                    Post
                  </Button>
                </Field>
              </form>
            </div>
          </div>
        </div>
      }
      previewPanel={
        <div className="h-full p-3">
          <div className="border-b pb-2 mb-4 flex items-center justify-between">
            <h2 className="scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight">
              Content Preview
            </h2>
            <Button variant="outline" onClick={handleSave} type="button">
              <Eye className="size-4" />
              Preview
            </Button>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: html || "" }}
            className="tiptap"
          ></div>
        </div>
      }
    />
  );
}
