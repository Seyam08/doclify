"use client";

import { editSocialLinks, updateBio } from "@/actions/author/author-action";
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
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
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
import { Spinner } from "@/components/ui/spinner";
import { SocialLinksType } from "@/types/schema.types";
import {
  socialLinkSchema,
  SocialLinkSchemaType,
} from "@/zod-schemas/social-link-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectSeparator } from "@radix-ui/react-select";
import { XIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export function EditBio({
  email,
  prevBio,
}: {
  email: string;
  prevBio: string | null;
}) {
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

export function EditSocialLinks({
  socialLink,
  email,
}: {
  socialLink?: SocialLinksType[] | null | undefined;
  email: string;
}) {
  const form = useForm<SocialLinkSchemaType>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      links: [{ address: "", platform: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });
  const [finish, setFinish] = useState<boolean>(false);

  useEffect(() => {
    if (socialLink && socialLink.length > 0) {
      form.setValue("links", socialLink);
    }
  }, [socialLink]);

  useEffect(() => {
    if (finish === true) {
      redirect("/dashboard/me");
    }
  }, [finish]);

  async function onSubmit(data: SocialLinkSchemaType) {
    if (JSON.stringify(data.links) === JSON.stringify(socialLink)) {
      return toast.error("Nothing to update!");
    }

    const response = await editSocialLinks(data, email);

    if (response.success === true) {
      toast.success(response.message);
      setFinish(true);
    } else {
      toast.error(response.message);
    }
  }
  return (
    <form id="edit-social-link" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet className="gap-4">
        <FieldDescription>
          Add up to 3 social links, where user can find you.
        </FieldDescription>
        <FieldGroup className="gap-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex">
              <Controller
                name={`links.${index}.platform`}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="basis-1/3"
                  >
                    <FieldContent>
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
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
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
                          placeholder="https://www.facebook.com/jhon.doe"
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
                              aria-label={`Remove ${index + 1}`}
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
            className="disabled:cursor-not-allowed disabled:pointer-events-auto"
            onClick={() => append({ address: "", platform: "" })}
            disabled={fields.length >= 3}
          >
            Add Social Link
          </Button>

          <Button type="submit" size="sm" form="edit-social-link">
            {form.formState.isSubmitting ? <Spinner /> : <Check />}
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
