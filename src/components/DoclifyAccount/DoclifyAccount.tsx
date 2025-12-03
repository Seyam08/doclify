"use client";

import { updateBio } from "@/actions/author/author-action";
import SubmitButton from "@/components/authentication/submit-button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectSeparator } from "@radix-ui/react-select";
import { XIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

export function EditBio({
  email,
  prevBio,
}: {
  email: string;
  prevBio: string | null;
}) {
  const router = useRouter();
  const [state, formAction, _] = useActionState(updateBio, {
    success: null,
    submitted: false,
    message: "",
    prevBio,
  });

  useEffect(() => {
    if (!state?.submitted) return; // <-- prevents first render

    if (state.success === true) {
      toast.success(state.message);
      redirect("/dashboard/me");
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <InputGroup>
        <Input type="hidden" name="email" defaultValue={email} />
        <InputGroupTextarea
          id="edit-bio"
          name="edit-bio"
          placeholder="place your content..."
          className="min-h-[150px]"
          defaultValue={prevBio ?? ""}
        />
        <InputGroupAddon align="block-end" className="border-t">
          <SubmitButton
            size="sm"
            className="ml-auto"
            variant="outline"
            type="submit"
            icon={<Check />}
          >
            confirm
          </SubmitButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}

const socialMedia = [
  { platform: "Facebook", value: "facebook" },
  { platform: "Linkedin", value: "linkedin" },
  { platform: "Twitter", value: "twitter" },
] as const;

const formSchema = z.object({
  links: z
    .array(
      z.object({
        address: z.url("Enter a valid URL."),
        platform: z.string().min(1, "Please select your spoken language."),
      })
    )
    .min(1, "Add at least one social links.")
    .max(3, "You can add up to 3 social links."),
});
export function EditSocialLinks() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: [{ address: "", platform: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <form id="form-rhf-array" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet className="gap-4">
        <FieldDescription>
          Add up to 3 social links, where user can find you.
        </FieldDescription>
        <FieldGroup className="gap-4">
          {fields.map((field, index) => (
            <div key={index} className="flex">
              <Controller
                name={`links.${index}.platform`}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="basis-1/3"
                  >
                    <Select
                      name={controllerField.name}
                      value={controllerField.value}
                      onValueChange={controllerField.onChange}
                    >
                      <SelectTrigger
                        id="platform-select"
                        aria-invalid={fieldState.invalid}
                        className="min-w-full rounded-br-none rounded-tr-none"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectSeparator />
                        {socialMedia.map((media) => (
                          <SelectItem key={media.value} value={media.value}>
                            {media.platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Controller
                key={field.id}
                name={`links.${index}.address`}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="basis-2/3"
                  >
                    <FieldContent>
                      <InputGroup className="rounded-tl-none rounded-bl-none">
                        <InputGroupInput
                          {...controllerField}
                          id={`form-rhf-array-email-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="https://www.facebook.com/"
                          type="url"
                          autoComplete="url"
                        />

                        {fields.length > 1 && (
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => remove(index)}
                              aria-label={`Remove email ${index + 1}`}
                            >
                              <XIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        )}
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </div>
          ))}
        </FieldGroup>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ address: "", platform: "" })}
            disabled={fields.length >= 3}
          >
            Add Social Link
          </Button>
          <Button type="submit" size="sm" form="form-rhf-array">
            Save
          </Button>
        </Field>
        {form.formState.errors.links?.root && (
          <FieldError errors={[form.formState.errors.links.root]} />
        )}
      </FieldSet>
    </form>
  );
}
