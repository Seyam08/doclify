import { UserProfileDropDownItem } from "@/components/authentication/user-profile";
import { NavbarNavLink } from "@/components/ui/navbar";
import { SquarePen, User } from "lucide-react";

export const navLink: NavbarNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Latest" },
  { href: "/author", label: "Authors" },
  { href: "/categories", label: "Categories" },
  { href: "/tags", label: "Tags" },
];

export const userProfileLinks: UserProfileDropDownItem[] = [
  { href: "/dashboard/add-post", icon: SquarePen, label: "Write a Blog" },
  { href: "/dashboard/me", icon: User, label: "Account" },
];
