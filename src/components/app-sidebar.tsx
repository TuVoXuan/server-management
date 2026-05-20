"use client";

import { NavLogo } from "@/components/nav-logo";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavMainItems from "@/constants/nav-main-items";
import { FrameIcon, MapIcon, PieChartIcon, Server } from "lucide-react";
import { useAppStore } from "@/store/useApp";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { getActiveNav } from "@/lib/utils";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <FrameIcon />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <PieChartIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setActiveNav } = useAppStore();
  const location = useLocation();
  const curPathname = location.pathname;

  useEffect(() => {
    const { activeChild, activeParent } = getActiveNav(curPathname);
    setActiveNav({ parent: activeParent, children: activeChild });
  }, [curPathname]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo name={"Servix"} logo={<Server />} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={NavMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
