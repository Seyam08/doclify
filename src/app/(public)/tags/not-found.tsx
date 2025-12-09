import GoBackBtn from "@/components/NotFound/GoBackBtn";
import { DoclifyNotFound } from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags Not Found",
  description: "Doclify",
};
export default function NotFound() {
  return (
    <DoclifyNotFound
      title="Tags not found"
      description="Unable to get Tags."
      className="justify-start"
      cta={<GoBackBtn />}
    />
  );
}
