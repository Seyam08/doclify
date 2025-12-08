"use client";

import DOMPurify from "isomorphic-dompurify";

export function contentPurify(html: string) {
  return DOMPurify.sanitize(html);
}
