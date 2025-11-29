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
import React, { useEffect, useMemo, useState } from "react";

type SearchInputProps = {
  itemList: string[];
  setItem: React.Dispatch<React.SetStateAction<string[]>>;
  existedItems?: string[];
  featureName: string;
  clear?: boolean;
} & React.ComponentProps<"div">;

export default function SearchInput({
  itemList = [],
  setItem,
  existedItems = [],
  featureName,
  className,
  clear,
}: SearchInputProps) {
  const [search, setSearch] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  /** Add existing items only ONCE (initial mount) */
  useEffect(() => {
    if (existedItems.length > 0) {
      setSelectedItems(existedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Parent state update ONLY when items change */
  useEffect(() => {
    setItem(selectedItems);
  }, [selectedItems]); // safe (setter not needed)

  /** Clear trigger */
  useEffect(() => {
    if (clear) {
      setSelectedItems([]);
    }
  }, [clear]);

  /** Filter items for dropdown */
  const filteredItems = useMemo(() => {
    return itemList.filter(
      (item) =>
        item.toLowerCase().includes(search.toLowerCase()) &&
        !selectedItems.includes(item)
    );
  }, [itemList, search, selectedItems]);

  /** Add new item */
  const selectItem = (item: string) => {
    const trimmed = item.trim().toLowerCase();

    setSelectedItems((prev) =>
      prev.includes(trimmed) ? prev : [...prev, trimmed]
    );
  };

  /** Remove selected */
  const removeItem = (item: string) => {
    setSelectedItems((prev) => prev.filter((i) => i !== item));
  };

  return (
    <div className={cn("w-full relative", className)}>
      {/* Selected Item Badges */}
      <div
        className={cn("flex flex-wrap gap-2", {
          "mb-2": selectedItems.length > 0,
        })}
      >
        {selectedItems.map((item) => (
          <Badge variant="outline" key={item} className="capitalize">
            {item}
            <Button
              size="icon-sm"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                removeItem(item);
              }}
              className="size-5 border-0 p-0 bg-transparent! hover:bg-accent hover:text-destructive"
            >
              <CircleX />
            </Button>
          </Badge>
        ))}
      </div>

      {/* Input Search */}
      <div className="w-full relative">
        <InputGroup className="overflow-hidden">
          <InputGroupInput
            placeholder={`Type to search ${featureName}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              <InputGroupButton
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  setSearch("");
                }}
              >
                <CircleX className="text-foreground" />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>

      {/* Dropdown List */}
      {search && (
        <ul className="absolute mt-1 p-1 w-full bg-popover border rounded-lg shadow-lg max-h-60 overflow-auto z-10 space-y-2">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item}
                className="p-2 rounded-lg cursor-pointer hover:bg-accent text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  selectItem(item);
                  setSearch("");
                }}
              >
                <div className="text-foreground capitalize">{item}</div>
              </li>
            ))
          ) : (
            <li className="p-2 rounded-lg text-sm">
              <div className="text-foreground">No {featureName}s found</div>
            </li>
          )}

          {/* Add Custom */}
          <li>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                selectItem(search);
                setSearch("");
              }}
            >
              Add this {featureName}
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
}
