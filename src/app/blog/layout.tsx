import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Single Post",
  description: "View a single post on Doclify.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[radial-gradient(circle_at_top_center,rgb(161,210,247,0.6),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_center,rgb(2,13,25,1),transparent_70%)] bg-fixed">
      <div className="flex flex-col width-holder">{children}</div>
    </div>
  );
}
