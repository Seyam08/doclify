import GoBackBtn from "@/components/NotFound/GoBackBtn";
import { DoclifyNotFound } from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs Not Found",
  description: "Doclify",
};
export default function NotFound() {
  return (
    <DoclifyNotFound
      title="Blogs not found"
      description="Unable to get blogs."
      className="justify-start"
      cta={<GoBackBtn />}
    />
  );
}
