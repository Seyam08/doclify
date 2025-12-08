import { UserProfileDropDownItem } from "@/components/authentication/user-profile";
import { NavbarNavLink } from "@/components/ui/navbar";
import { ChartLine, Frame, PieChart, SquarePen, User } from "lucide-react";

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

export const dashboardSidebarLinks = {
  navMain: [
    {
      title: "Blogs",
      url: "#",
      icon: SquarePen,
      isActive: true,
      items: [
        {
          title: "My Blogs",
          url: "/dashboard",
        },
        {
          title: "Add Blog",
          url: "/dashboard/add-post",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Categories",
      url: "/dashboard/coming-soon",
      icon: Frame,
    },
    {
      name: "Tags",
      url: "/dashboard/coming-soon",
      icon: PieChart,
    },
    {
      name: "Growth",
      url: "/dashboard/coming-soon",
      icon: ChartLine,
    },
  ],
};
