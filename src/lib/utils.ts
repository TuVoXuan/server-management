import NavMainItems from "@/constants/nav-main-items";
import { ActivityColors, ActivityTypes } from "@/constants/server";
import type { IServer } from "@/types";
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

export function generateActivityText(activityType: string) {
  switch (activityType) {
    case ActivityTypes.SERVER_CREATED:
      return "was created";

    case ActivityTypes.SERVER_UPDATED:
      return "was updated";

    case ActivityTypes.SERVER_RESTARTED:
      return "was restarted";

    case ActivityTypes.SERVER_STOPPED:
      return "was stopped";

    case ActivityTypes.SERVER_STARTED:
      return "was started";

    default:
      return "has activity";
  }
}

export function generateRandomServerEvent(servers: IServer[]) {
  const randomServer = servers[Math.floor(Math.random() * servers.length)];

  const activityValues = Object.values(ActivityTypes);

  const randomActivity = activityValues[
    Math.floor(Math.random() * activityValues.length)
  ] as keyof typeof ActivityColors;

  return {
    title: `${randomServer.name} ${generateActivityText(randomActivity)}`,
    created_at: Date.now(),
    dotColor: ActivityColors[randomActivity],
    activity_type: randomActivity,
    server_id: randomServer.id,
  };
}
