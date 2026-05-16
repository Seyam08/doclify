"use client";

import { sendNewsLetter } from "@/actions/news-letter/news-letter-action";
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { newsLetterSchema } from "@/zod-schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { ComponentProps } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export function NewsLetterForm({ className }: ComponentProps<"div">) {
  const form = useForm<z.infer<typeof newsLetterSchema>>({
    resolver: zodResolver(newsLetterSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof newsLetterSchema>) {
    try {
      const response = await sendNewsLetter(data);
      if (response.success === true) {
        toast.success(response.message);
        form.reset();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to subscribe");
    }
  }
  return (
    <form
      className={cn(`flex flex-col gap-5`, className)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-3">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id={field.name}
                type="name"
                placeholder="Name"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="Enter your email address"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Button
        variant="outline"
        className="flex items-center justify-between group"
        type="submit"
      >
        Subscribe Now
        <ArrowUpRight className="h-6 w-6 group-hover:rotate-45 transition-all duration-300" />
      </Button>
    </form>
  );
}
