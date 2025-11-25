import { clsx, type ClassValue } from "clsx";
import DOMPurify from "isomorphic-dompurify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function contentPurify(html: string) {
  return DOMPurify.sanitize(html);
}
