"use client";
import { addPost } from "@/actions/post/post-actions";
import SearchInput from "@/components/SearchInput/SearchInput";
import AddPostContainer from "@/components/ui/add-post/add-post-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditorWrapper from "@/components/ui/editor/editor-wrapper";
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
import { contentPurify } from "@/lib/utils-client";
import { ServerActionResponse } from "@/types/global-types";
import { addPostSchema } from "@/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleMinus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function AddPost({
  categoryList,
  tagList,
}: {
  categoryList: Array<string>;
  tagList: Array<string>;
}) {
  const [content, setContent] = useState<string>("");
  const [editorKey, setEditorKey] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sync, setSync] = useState<boolean>(false);
  const [clear, setClear] = useState<boolean>(false); // to clear tag and category state
  const form = useForm<z.infer<typeof addPostSchema>>({
    resolver: zodResolver(addPostSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined,
      content: "",
    },
  });

  useEffect(() => {
    const cleanContent = contentPurify(content);
    form.setValue("content", cleanContent);
  }, [content]);

  async function onSubmit(data: z.infer<typeof addPostSchema>) {
    if (!sync) {
      toast.error("You haven't saved content!");
      form.setError("content", { message: "You haven't saved content!" });
      return;
    }
    try {
      const response: ServerActionResponse<string | undefined> = await addPost({
        ...data,
        tags: tags,
        categories: categories,
      });

      if (response.success === true) {
        toast.success(response.message);

        setContent("");
        setCategories([]);
        setTags([]);
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

  return (
    <AddPostContainer
      disabled={!sync}
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

                {/* add categories  */}

                <Field className="mt-5">
                  <FieldLabel>Add categories</FieldLabel>
                  <SearchInput
                    itemList={categoryList}
                    setItem={setCategories}
                    featureName="category"
                    clear={clear}
                    existedItems={categories}
                  />
                </Field>

                {/* add tags  */}
                <Field className="mt-5">
                  <FieldLabel>Add tags</FieldLabel>
                  <SearchInput
                    itemList={tagList}
                    setItem={setTags}
                    featureName="tag"
                    clear={clear}
                    existedItems={tags}
                  />
                </Field>

                <Field className="mt-5">
                  <EditorWrapper
                    setContent={setContent}
                    content={content}
                    key={editorKey}
                    syncContent={setSync}
                  />
                  {form.formState.errors.content && (
                    <FieldError errors={[form.formState.errors.content]} />
                  )}
                </Field>

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
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: content || "" }}
            className="tiptap"
          ></div>
        </div>
      }
    />
  );
}
