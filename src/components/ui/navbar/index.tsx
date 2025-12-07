"use client";

import { DoclifyFullLogo } from "@/components/DoclifyLogo/DoclifyLogo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

// Types
export interface NavbarNavLink {
  href: string;
  label: string;
}

type NavbarProps = {
  logoHref?: string;
  navigationLinks?: NavbarNavLink[];
  userProfile?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

// Default navigation links
const defaultNavigationLinks: NavbarNavLink[] = [
  { href: "#", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

export function Navbar({
  className,
  logoHref = "/",
  navigationLinks = defaultNavigationLinks,
  userProfile,
  ...props
}: NavbarProps) {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 md:px-6 :no-underline",
        className
      )}
      {...(props as any)}
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          {isMobile && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                  variant="ghost"
                  size="icon"
                >
                  <Menu />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                className="w-36 p-2 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80"
              >
                <NavigationMenu className="max-w-full block">
                  <NavigationMenuList className="flex-col items-start gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <Link
                          className={cn(
                            "w-full flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline",
                            link.href === pathname
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80"
                          )}
                          href={link.href}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          )}
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <DoclifyFullLogo logoHref={logoHref} />
            {/* Navigation menu */}
            {!isMobile && (
              <NavigationMenu className="flex">
                <NavigationMenuList className="gap-1">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <Link
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                          link.href === pathname
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground/80 hover:text-foreground"
                        )}
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            )}
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          {userProfile ? (
            userProfile
          ) : (
            <Button variant="outline" className="px-2 py-1 cursor-pointer">
              <User className="size-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
