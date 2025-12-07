import { UserProfile } from "@/components/authentication/user-profile";
import { Navbar } from "@/components/ui/navbar";
import { navLink } from "@/const/navLink";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-full bg-[radial-gradient(circle_at_top_center,rgb(161,210,247,0.6),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_center,rgb(2,13,25,1),transparent_70%)] bg-fixed">
      <Navbar userProfile={<UserProfile />} navigationLinks={navLink} />
      {children}
    </main>
  );
}
