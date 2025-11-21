"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  icon,
  ...props
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
} & React.ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} disabled={pending}>
      {pending ? <Spinner /> : icon}
      {children}
    </Button>
  );
}
