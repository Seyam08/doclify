import { signOutSocialAuth } from "@/actions/auth/social-auth";
import SubmitButton from "@/components/authentication/submit-button";
import { Field } from "@/components/ui/field";
import { LogOut } from "lucide-react";

export default function SocialLogOut() {
  return (
    <form action={signOutSocialAuth}>
      <Field>
        <SubmitButton
          variant="outline"
          type="submit"
          className="cursor-pointer"
          icon={<LogOut />}
        >
          LogOut
        </SubmitButton>
      </Field>
    </form>
  );
}
