"use client";

import { ChartLine, Frame, PieChart, SquarePen } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/dashboard-layout/nav-main";
import { NavProjects } from "@/components/dashboard-layout/nav-projects";
import { NavUser } from "@/components/dashboard-layout/nav-user";
import { DoclifyFullLogo } from "@/components/DoclifyLogo/DoclifyLogo";
import { DashboardModeToggle } from "@/components/mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Blogs",
      url: "#",
      icon: SquarePen,
      isActive: true,
      items: [
        {
          title: "My Blogs",
          url: "/dashboard/coming-soon",
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

export function AppSidebar({
  user,
  ...props
}: {
  user: {
    name: string;
    email: string;
    image: string;
  };
} & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <DoclifyFullLogo logoHref="/dashboard" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-center">
          <DashboardModeToggle />
        </div>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
