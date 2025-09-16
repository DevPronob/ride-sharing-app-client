/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconAccessPoint,
  IconMap,
} from "@tabler/icons-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import { Link } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: meData } = useGetMeQuery(undefined);

  const userRole: TRole | undefined = meData?.data?.role as TRole;
  const userName = meData?.data?.name || "User";

  const navItems: Record<TRole, { title: string; url: string; icon: any }[]> = {
    ADMIN: [
      { title: "Dashboard", url: "/dashboard/rides", icon: IconDashboard },
      { title: "Users Management", url: "/dashboard/user-management", icon: IconListDetails },
      { title: "Drivers Management", url: "/dashboard/driver-management", icon: IconChartBar },
      { title: "Rides Analytics", url: "/dashboard/analytics", icon: IconListDetails },
      { title: "Profile Management", url: "/dashboard/admin/update-profile", icon: IconAccessPoint },
    ],
    DRIVER: [
      { title: "Accept Rides", url: "/dashboard/accept-request", icon: IconDashboard },
      { title: "Ride History", url: "/dashboard/ride-history", icon: IconListDetails },
      { title: "Active Ride", url: "/dashboard/active-ride", icon: IconChartBar },
      { title: "Earnings", url: "/dashboard/earnings", icon: IconChartBar },
      { title: "Analytics", url: "/dashboard/driver/analytics", icon: IconChartBar },
      { title: "Profile", url: "/dashboard/driver/update-profile", icon: IconDashboard },
      { title: "Location", url: "/dashboard/driver/ride-tracking", icon:  IconMap},
    ],
    RIDER: [
      { title: "Book a Ride", url: "/book-a-ride", icon: IconDashboard },
      { title: "Ride History", url: "/dashboard/rider-ride-history", icon: IconListDetails },
      { title: "Profile", url: "/dashboard/rider/update-profile", icon: IconDashboard },
      { title: "Driver Location", url: "/dashboard/rider/ride-tracking", icon:  IconMap},
    ],
  };

  const items = userRole ? navItems[userRole] : [];
  console.log(meData?.data.role,"jjj")

  const user = {
    name: userName,
    email: meData?.data?.email || "",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
            <div className="py-2 ms-2 mt-2">
              <Link
                to="/"
                type="button"
                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
              >
                Home
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <div className="flex flex-col space-y-1">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.url}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
