"use client";

import { useEffect, useState } from "react";

export default function ErrorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [throwError, setThrowError] = useState(false);

  // When state becomes true, throw an error
  useEffect(() => {
    if (throwError) {
      throw new Error("Manually triggered error from ErrorWrapper!");
    }
  }, [throwError]);

  return (
    <div>
      {/* Render children */}
      {children}

      <button
        style={{ marginTop: 20 }}
        onClick={() => setThrowError((v) => !v)}
      >
        Toggle Error
      </button>
    </div>
  );
}
