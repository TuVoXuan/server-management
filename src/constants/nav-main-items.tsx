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
    title: "Server",
    url: AppPath.SERVER,
    icon: <Server />,
  },
  {
    title: "Setting",
    url: AppPath.SETTING,
    icon: <Settings />,
  },
];

export default NavMainItems;
