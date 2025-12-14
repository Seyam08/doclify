import { auth } from "@/auth";
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
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardSidebarLinks } from "@/const/navLink";
import { Suspense } from "react";

async function NavUserWrapper() {
  const session = await auth();
  const user = {
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    image: session?.user?.image ?? "",
  };

  return <NavUser user={user} />;
}

export async function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
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
        <Suspense fallback={<Skeleton className="w-full h-12" />}>
          <NavUserWrapper />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
