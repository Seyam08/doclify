"use client";

import { DoclifyError } from "@/components/Error/Error";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  const tryAgain = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <main className="relative w-full bg-[radial-gradient(circle_at_top_center,rgb(161,210,247,0.6),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_center,rgb(2,13,25,1),transparent_70%)] bg-fixed">
      <div className="max-w-6xl 2xl:max-w-7xl w-full mx-auto px-4 md:px-10">
        <DoclifyError
          cta={
            <Button variant="outline" onClick={() => tryAgain()}>
              <RefreshCcw />
              Try again
            </Button>
          }
        />
      </div>
    </main>
  );
}
