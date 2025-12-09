import GoBackBtn from "@/components/NotFound/GoBackBtn";
import { DoclifyNotFound } from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Doclify",
};
export default function NotFound() {
  return <DoclifyNotFound className="px-4" cta={<GoBackBtn />} />;
}
