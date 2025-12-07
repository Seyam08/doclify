import { DoclifyComingSoon01 } from "@/components/DoclifyComingSoon/DoclifyComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ComingSoon",
  description: "Doclify",
};

export default function Page() {
  return <DoclifyComingSoon01 className="min-h-dvh p-0 md:p-0" />;
}
