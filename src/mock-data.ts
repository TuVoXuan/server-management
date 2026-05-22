import { compareAsc } from "date-fns";
import {
  ActivityTypes,
  OperationSystem,
  Platform,
  ServerStatus,
} from "./constants/server";

export const locations = [
  {
    id: 1,
    name: "New York, USA",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: 2,
    name: "London, UK",
    latitude: 51.5072,
    longitude: -0.1276,
  },
  {
    id: 3,
    name: "Tokyo, Japan",
    latitude: 35.6762,
    longitude: 139.6503,
  },
  {
    id: 4,
    name: "Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
  },
  {
    id: 5,
    name: "Sydney, Australia",
    latitude: -33.8688,
    longitude: 151.2093,
  },
  {
    id: 6,
    name: "Frankfurt, Germany",
    latitude: 50.1109,
    longitude: 8.6821,
  },
  {
    id: 7,
    name: "Toronto, Canada",
    latitude: 43.6532,
    longitude: -79.3832,
  },
  {
    id: 8,
    name: "São Paulo, Brazil",
    latitude: -23.5505,
    longitude: -46.6333,
  },
  {
    id: 9,
    name: "Seoul, South Korea",
    latitude: 37.5665,
    longitude: 126.978,
  },
  {
    id: 10,
    name: "Ho Chi Minh City, Vietnam",
    latitude: 10.8231,
    longitude: 106.6297,
  },
];

const osList = Object.values(OperationSystem);
const platformList = Object.values(Platform);
const statusList = Object.values(ServerStatus);

export const servers = [
  // 1 - 40
  ...Array.from({ length: 40 }, (_, i) => {
    const id = i + 1;

    return {
      id,
      IP_address: `10.0.${Math.floor(id / 10)}.${id}`,
      location_id: ((id - 1) % 10) + 1,
      name: `server-${id.toString().padStart(2, "0")}`,
      operation_system: osList[id % osList.length],
      version: ["20.04", "22.04", "11", "2022"][id % 4],
      platform: platformList[id % platformList.length],
      sys_architecture: id % 2 === 0 ? "x64" : "x86",
      status: statusList[Math.floor(Math.random() * 2)],
      created_at: `2026-05-${String((id % 28) + 1).padStart(2, "0")}T08:00:00Z`,
      updated_at: `2026-05-${String((id % 28) + 1).padStart(2, "0")}T12:00:00Z`,
    };
  }),
];

const activityTypes = Object.values(ActivityTypes);

export const serverActivities = [
  // 1 - 50
  ...Array.from({ length: 50 }, (_, i) => {
    const id = i + 1;

    return {
      id,
      server_id: ((id - 1) % 40) + 1,
      activity_type: activityTypes[id % activityTypes.length],
      created_at: `2026-05-${String((id % 28) + 1).padStart(2, "0")}T10:00:00Z`,
      updated_at: `2026-05-${String((id % 28) + 1).padStart(2, "0")}T10:30:00Z`,
    };
  }),
];

export function getTotalServerByStatus(status: string) {
  return servers.filter((server) => server.status == status).length;
}

export function filterTotalServerAndNewServer(from: Date, to: Date) {
  const totalServer = servers.filter(
    (server) => compareAsc(server.created_at, to) <= 0,
  ).length;

  const totalNewServer = servers.filter(
    (server) =>
      compareAsc(from, server.created_at) <= 0 &&
      compareAsc(server.created_at, to) <= 0,
  ).length;

  return { totalServer, totalNewServer };
}
