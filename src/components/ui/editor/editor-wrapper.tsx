"use client";

import { Button } from "@/components/ui/button";
import { contentPurify } from "@/lib/utils-client";
import { Check } from "lucide-react";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MinimalTiptap } from ".";

export default function EditorWrapper({
  setContent,
  content,
  syncContent,
}: {
  setContent: Dispatch<SetStateAction<string>>;
  syncContent: Dispatch<SetStateAction<boolean>>;
  content: string;
}) {
  const [state, setState] = useState(content);
  const [lastSavedContent, setLastSavedContent] = useState(content);

  // If parent changes content (switch post), update editor
  useEffect(() => {
    setState(content);
    setLastSavedContent(content);
  }, [content]);

  // Purify only when state changes (avoids expensive repeated work)
  const purifiedState = useMemo(() => contentPurify(state), [state]);

  // Compare current vs saved
  const isSynced = lastSavedContent === purifiedState;

  useEffect(() => {
    syncContent(isSynced);
  }, [isSynced, syncContent]);

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setContent(purifiedState);
    setLastSavedContent(purifiedState);
  };

  return (
    <div className="relative">
      <MinimalTiptap
        key={lastSavedContent}
        content={state}
        onChange={setState}
        placeholder="Start typing your content here..."
      />

      <Button
        variant="outline"
        onClick={handleSave}
        className="absolute bottom-2 right-2"
      >
        {isSynced ? (
          <span className="text-green-500">
            <Check />
          </span>
        ) : (
          <span className="text-red-500">!</span>
        )}{" "}
        Save
      </Button>
    </div>
  );
}
