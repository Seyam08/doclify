"use client";

import { DoclifyError } from "@/components/Error/Error";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const tryAgain = () => {
    startTransition(() => {
      reset();
    });
  };

  return (
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
  );
}
