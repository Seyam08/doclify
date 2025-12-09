import GoBackBtn from "@/components/NotFound/GoBackBtn";
import { DoclifyNotFound } from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tag Not Found",
  description: "Doclify",
};
export default function NotFound() {
  return (
    <DoclifyNotFound
      title="Tag not found"
      description="Here is no Tag in this name."
      className="justify-start"
      cta={<GoBackBtn />}
    />
  );
}
