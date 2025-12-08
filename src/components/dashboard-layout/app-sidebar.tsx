"use client";

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
import { dashboardSidebarLinks } from "@/const/navLink";

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
        <NavMain items={dashboardSidebarLinks.navMain} />
        <NavProjects projects={dashboardSidebarLinks.projects} />
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
