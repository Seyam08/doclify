import { DoclifyComingSoon01 } from "@/components/DoclifyComingSoon/DoclifyComingSoon";
import GoBackBtn from "@/components/NotFound/GoBackBtn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ComingSoon",
  description: "Doclify",
};

export default function Page() {
  return <DoclifyComingSoon01 className="px-4" cta={<GoBackBtn />} />;
}
