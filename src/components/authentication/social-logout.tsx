import { signOutSocialAuth } from "@/actions/auth/social-auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { LogOut } from "lucide-react";

export default function SocialLogOut() {
  return (
    <form action={signOutSocialAuth}>
      <Field>
        <Button variant="outline" type="submit" className="cursor-pointer">
          <LogOut />
          LogOut
        </Button>
      </Field>
    </form>
  );
}
