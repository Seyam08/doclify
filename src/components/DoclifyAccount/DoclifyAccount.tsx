"use client";

import { updateBio } from "@/actions/author/author-action";
import SubmitButton from "@/components/authentication/submit-button";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Check } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

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
