import type { NavItem } from "@/types";
import AppPath from "./app-path";
import { LayoutDashboard, Server, Settings } from "lucide-react";

const NavMainItems: NavItem[] = [
  {
    title: "Dashboard",
    url: AppPath.DASHBOARD,
    icon: <LayoutDashboard />,
  },
  {
    title: "Infrastructure",
    url: AppPath.INFRASTRUCTURE,
    icon: <Server />,
    items: [
      { title: "Servers", url: AppPath.INFRASTRUCTURE_SERVERS },
      { title: "Locations", url: AppPath.INFRASTRUCTURE_LOCATIONS },
    ],
  },
  {
    title: "Setting",
    url: AppPath.SETTING,
    icon: <Settings />,
  },
];

export default NavMainItems;
