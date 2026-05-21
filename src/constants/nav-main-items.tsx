import type { NavItem } from "@/types";
import AppPath from "./app-path";
import { LayoutDashboard, Server, Settings } from "lucide-react";

const NavMainItems: NavItem[] = [
  {
    title: "Dashboard",
    url: AppPath.DASHBOARD,
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    title: "Infrastructure",
    url: AppPath.INFRASTRUCTURE,
    icon: <Server className="size-5" />,
    items: [
      { title: "Servers", url: AppPath.INFRASTRUCTURE_SERVERS },
      { title: "Locations", url: AppPath.INFRASTRUCTURE_LOCATIONS },
    ],
  },
  {
    title: "Setting",
    url: AppPath.SETTING,
    icon: <Settings className="size-5" />,
  },
];

export default NavMainItems;
