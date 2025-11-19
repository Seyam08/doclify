import { BadgeCheck, Bell, CreditCard, Sparkles, User } from "lucide-react";

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
import Image from "next/image";
import SocialLogOut from "./social-logout";

export async function UserProfile() {
  const session = await auth();
  console.log(session);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-2 py-1 cursor-pointer">
          <User className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
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
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
        <DropdownMenuSeparator />
        {session?.user ? <SocialLogOut /> : <SocialLogin />}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
