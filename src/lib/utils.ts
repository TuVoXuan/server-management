import NavMainItems from "@/constants/nav-main-items";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getActiveNav(pathname: string) {
  for (const item of NavMainItems) {
    // check parent
    const isParentActive = item.url !== "/" && pathname.startsWith(item.url);

    // check child
    const activeChild = item.items?.find((subItem) =>
      pathname.startsWith(subItem.url),
    );

    if (isParentActive || activeChild) {
      return {
        activeParent: item,
        activeChild,
      };
    }
  }

  return {
    activeParent: undefined,
    activeChild: undefined,
  };
}
