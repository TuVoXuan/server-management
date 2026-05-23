import NavMainItems from "@/constants/nav-main-items";
import { activityDescriptions, ActivityTypes } from "@/constants/server";
import type { IServer, IServerActivity } from "@/types";
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

export function generateRandomServerEvent(servers: IServer[]): IServerActivity {
  const randomServer = servers[Math.floor(Math.random() * servers.length)];

  const activityValues = Object.values(ActivityTypes);

  const randomActivity = activityValues[
    Math.floor(Math.random() * activityValues.length)
  ] as keyof typeof activityDescriptions;

  const descriptions = activityDescriptions[randomActivity];

  const randomDescription =
    descriptions[Math.floor(Math.random() * descriptions.length)];

  return {
    serverName: randomServer.name,
    description: randomDescription,
    createdAt: Date.now(),
    activityType: randomActivity,
    serverId: randomServer.id,
  };
}
