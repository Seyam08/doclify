import { DoclifyNotFound } from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Doclify",
};
export default function NotFound() {
  return <DoclifyNotFound />;
}
