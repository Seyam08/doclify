import { UserProfile } from "@/components/authentication/user-profile";
import Footer from "@/components/DoclifySections/Footer";
import { NavbarSkeleton } from "@/components/DoclifySkeleton/DoclifySkeleton";
import { Navbar } from "@/components/ui/navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { navLink } from "@/const/navLink";
import { cn } from "@/lib/utils";
import { Jersey_20, Plus_Jakarta_Sans, Stack_Sans_Notch } from "next/font/google";
import { Suspense } from "react";

const jersey20 = Jersey_20({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ollyo-display",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ollyo-body",
});

const stackSansNotch = Stack_Sans_Notch({
  subsets: ["latin"],
  variable: "--font-ollyo-emphasis",
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={cn(
        "ollyo-public relative min-h-screen w-full overflow-hidden bg-background text-foreground",
        jersey20.variable,
        plusJakarta.variable,
        stackSansNotch.variable,
      )}
    >
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar
          className="ollyo-nav"
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
