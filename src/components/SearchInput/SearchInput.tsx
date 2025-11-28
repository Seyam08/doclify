import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import React, { useEffect, useState } from "react";

type SearchInputProps = {
  itemList: string[];
  setItem: React.Dispatch<React.SetStateAction<string[]>>;
  existedItems?: string[];
  featureName: string;
};

export default function SearchInput({
  itemList = [],
  setItem,
  existedItems = [],
  featureName,
  className,
}: SearchInputProps & React.ComponentProps<"div">) {
  const [search, setSearch] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Pass selected usernames to parent
  useEffect(() => {
    setItem(selectedItems);
  }, [selectedItems, setItem]);

  // Add existedUsers initially
  useEffect(() => {
    if (existedItems.length > 0) {
      setSelectedItems((prev) => [...prev, ...existedItems]);
    }
  }, [existedItems]);

  const filteredItems = itemList.filter(
    (item) =>
      item.toLowerCase().includes(search.toLowerCase()) &&
      !selectedItems.some((i) => i === item)
  );
  // Add new item
  const selectItem = (item: string) => {
    const trimmedItem = item.trim();

    if (!trimmedItem) return;

    setSelectedItems((prev) => {
      if (prev.includes(trimmedItem)) {
        return prev;
      }
      return [...prev, trimmedItem];
    });
  };

  // Remove item
  const removeItem = (item: string) => {
    setSelectedItems((prev) => prev.filter((i) => i !== item));
  };

  return (
    <div className={cn("w-full relative", className)}>
      {/* Selected Users */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedItems.map((item, index) => (
          <Badge variant="outline" key={index}>
            {item}
            <Button
              size="icon-sm"
              variant="outline"
              onClick={() => removeItem(item)}
              className="size-5 border-0 p-0 bg-transparent! hover:bg-accent hover:text-destructive"
            >
              <CircleX />
            </Button>
          </Badge>
        ))}
      </div>

      {/* Search Input */}
      <div className="w-full relative">
        <InputGroup className="overflow-hidden">
          <InputGroupInput
            placeholder={`Type to search ${featureName}...`}
            value={search}
            onChange={(e) => {
              e.preventDefault();
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                selectItem(search);
                setSearch("");
              }
            }}
          />
          {search && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="outline" onClick={() => setSearch("")}>
                <CircleX className="text-foreground" />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>

      {/* Dropdown */}
      {search && (
        <ul className="absolute mt-1 p-1 w-full bg-popover border rounded-lg shadow-lg max-h-60 overflow-auto z-10 space-y-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                className="p-2 rounded-lg cursor-pointer hover:bg-accent"
                onClick={() => {
                  selectItem(item);
                  setSearch("");
                }}
              >
                <div className="text-foreground">{item}</div>
              </li>
            ))
          ) : (
            <li className="p-2 rounded-lg">
              <div className="text-foreground">No {featureName}s found</div>
            </li>
          )}
          <li>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                selectItem(search);
                setSearch("");
              }}
              className="cursor-pointer"
            >
              Add this {featureName}
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
}
