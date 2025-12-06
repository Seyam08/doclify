import { LayoutDashboard, LucideProps, User } from "lucide-react";

import { auth } from "@/auth";
import SocialLogin from "@/components/authentication/social-login";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userProfileLinks } from "@/const/navLink";
import Image from "next/image";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import SocialLogOut from "./social-logout";

export type UserProfileDropDownItem = {
  href?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
};

export async function UserProfile() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-2 py-1 cursor-pointer">
          <User className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80"
        side="top"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || "User"}
              />
              <AvatarFallback className="rounded-lg">
                <Image
                  src={session?.user?.image || "https://github.com/shadcn.png"}
                  alt="Avatar"
                  width={32}
                  height={32}
                />
              </AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {session?.user?.name || "Sign In First"}
              </span>
              <span className="truncate text-xs">
                {session?.user?.email || "to see your profile"}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        {session && (
          <>
            <DropdownMenuGroup>
              <Link href="/dashboard">
                <DropdownMenuItem className="cursor-pointer">
                  <LayoutDashboard />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {userProfileLinks.map((item, index) => {
                const { label, href, icon: Icon } = item;
                return (
                  <div key={index}>
                    {href ? (
                      <Link href={href}>
                        <DropdownMenuItem className="cursor-pointer">
                          {Icon && <Icon />}
                          {label}
                        </DropdownMenuItem>
                      </Link>
                    ) : (
                      <DropdownMenuItem>
                        {Icon && <Icon />}
                        {label}
                      </DropdownMenuItem>
                    )}
                  </div>
                );
              })}
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        {session?.user ? <SocialLogOut /> : <SocialLogin />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
