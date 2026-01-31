"use client";

import { deletePost, DeletePostState } from "@/actions/post/post-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export function DeletePostModal({
  currentAuthor,
  blogSlug,
}: {
  currentAuthor: string;
  blogSlug: string;
}) {
  const [confirmText, setConfirmText] = useState("");

  const [state, formAction] = useActionState(deletePost, {
    submitted: false,
    success: null,
    message: "",
  } satisfies DeletePostState);

  useEffect(() => {
    if (!state.submitted) return;

    if (state.success) {
      toast.success(state.message);
      redirect("/dashboard");
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="currentAuthor" value={currentAuthor} />
      <input type="hidden" name="blogSlug" value={blogSlug} />

      <Input
        name="confirmText"
        placeholder='Type "confirm" to delete'
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
      />

      <Button
        variant="destructive"
        type="submit"
        size="sm"
        disabled={confirmText !== "confirm"}
      >
        Confirm Delete
      </Button>
    </form>
  );
}
