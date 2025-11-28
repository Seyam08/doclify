"use client";
import { addPost } from "@/actions/post/post-actions";
import SearchInput from "@/components/SearchInput/SearchInput";
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
import { ServerActionResponse } from "@/types/global-types";
import { addPostSchema } from "@/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleMinus, Eye, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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

const categoryList = ["life", "work", "travel"];
const tagList = ["solo", "peace", "nature"];

export default function AddPost() {
  const [content, setContent] = useState<string>(initialContent);
  const [editorKey, setEditorKey] = useState<number>(0);
  const [cleanContent, setCleanContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [clear, setClear] = useState<boolean>(false); // to clear tag and category state
  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined,
    },
  });

  const selectedFile = form.watch("thumbnail");
  const fileUrl = selectedFile ? URL.createObjectURL(selectedFile) : null;

  useEffect(() => {
    return () => {
      if (fileUrl) {
        console.log("I am running");
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  async function onSubmit(data: z.infer<typeof addPostSchema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const purify = contentPurify(content);
      const response: ServerActionResponse<string | undefined> = await addPost({
        ...data,
        content: purify,
        tags: tags,
        categories: categories,
      });

      if (response.success === true) {
        toast.success(response.message);
        console.log(response);
        setContent("");
        setClear(true);
        form.reset();
        setEditorKey((prev) => prev + 1); // changing the key to destroy the old state
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add post");
    }
  }

  function handlePreview() {
    const purify = contentPurify(content);
    setCleanContent(purify);
  }

  return (
    <AddPostContainer
      editorPanel={
        <div className="h-full p-3">
          <div className="size-full flex flex-col items-start">
            <div className="w-full max-w-full h-screen overflow-y-auto scrollbar scrollbar-thumb-primary scrollbar-track-transparent scrollbar-corner-transparent">
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
                                    alt={selectedFile.name}
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
                                    field.onChange(undefined);
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

                {/* add tags  */}
                <Field className="mt-5">
                  <FieldLabel>Add tags</FieldLabel>
                  <SearchInput
                    itemList={tagList}
                    setItem={setTags}
                    featureName="tag"
                    clear={clear}
                  />
                </Field>

                {/* add categories  */}

                <Field className="mt-5">
                  <FieldLabel>Add categories</FieldLabel>
                  <SearchInput
                    itemList={categoryList}
                    setItem={setCategories}
                    featureName="category"
                    clear={clear}
                  />
                </Field>

                <MinimalTiptap
                  content={content}
                  onChange={setContent}
                  placeholder="Start typing your content here..."
                  className="mt-4"
                  key={editorKey} // maintaining a key to destroy the old state
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
            <Button variant="outline" onClick={handlePreview} type="button">
              <Eye className="size-4" />
              Preview
            </Button>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: cleanContent || "" }}
            className="tiptap"
          ></div>
        </div>
      }
    />
  );
}
