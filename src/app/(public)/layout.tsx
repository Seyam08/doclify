import { UserProfile } from "@/components/authentication/user-profile";
import Footer from "@/components/DoclifySections/Footer";
import { NavbarSkeleton } from "@/components/DoclifySkeleton/DoclifySkeleton";
import { Navbar } from "@/components/ui/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { navLink } from "@/const/navLink";
import { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-full bg-[radial-gradient(circle_at_top_center,rgb(161,210,247,0.6),transparent_70%)] dark:bg-[radial-gradient(circle_at_top_center,rgb(2,13,25,1),transparent_70%)] bg-fixed">
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar
          userProfile={
            <Suspense fallback={<Skeleton className="h-9 w-11.5" />}>
              <UserProfile />
            </Suspense>
          }
          navigationLinks={navLink}
        />
      </Suspense>
      {children}
      <Footer />
    </main>
  );
}
