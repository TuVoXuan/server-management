import NavMainItems from "@/constants/nav-main-items";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getActiveNav(pathname: string) {
  const activeNavItem = NavMainItems.find((item) =>
    pathname.startsWith(item.url),
  );
  return activeNavItem;
}
