import { Navbar } from "@/components/ui/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full">
      <Navbar />
      {children}
    </div>
  );
}
