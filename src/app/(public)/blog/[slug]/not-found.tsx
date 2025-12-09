import GoBackBtn from "@/components/NotFound/GoBackBtn";
import { DoclifyNotFound } from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Not Found",
  description: "Doclify",
};
export default function NotFound() {
  return (
    <DoclifyNotFound
      title="Blog not found"
      description="Here is no Blog in this name."
      className="justify-start"
      cta={<GoBackBtn />}
    />
  );
}
