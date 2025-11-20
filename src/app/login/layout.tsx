import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Doclify",
  description: "Login to publish and manage your documents on Doclify.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[radial-gradient(125%_125%_at_50%_10%,#ffffff_30%,#a1d2f7_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,#000000_30%,#020d19_100%)] flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-xl flex-col gap-4 items-center justify-center">
        {children}
      </div>
    </div>
  );
}
