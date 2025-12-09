import GoBackBtn from "@/components/NotFound/GoBackBtn";
import { DoclifyNotFound } from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category Not Found",
  description: "Doclify",
};
export default function NotFound() {
  return (
    <DoclifyNotFound
      title="Category not found"
      description="Here is no Category in this name."
      className="justify-start"
      cta={<GoBackBtn />}
    />
  );
}
