"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { ComponentProps } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export function NewsLetterForm({ className }: ComponentProps<"div">) {
  const formSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 5 characters.")
      .max(32, "Name must be at most 32 characters."),
    email: z.email({ error: "Please enter a valid Email!" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data);
    form.reset();
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
