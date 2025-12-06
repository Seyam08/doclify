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
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-xl flex-col gap-4 items-center justify-center">
        {children}
      </div>
    </div>
  );
}
