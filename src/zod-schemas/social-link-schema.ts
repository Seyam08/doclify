import z from "zod";

export const socialLinkSchema = z.object({
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

export type SocialLinkSchemaType = z.infer<typeof socialLinkSchema>;
