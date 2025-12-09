"use client";

import { Button } from "@/components/ui/button"; // if using shadcn
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

export default function GoBackBtn({ ...props }: ComponentProps<"button">) {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()} {...props}>
      <ArrowLeft />
      Go Back
    </Button>
  );
}
