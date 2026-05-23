/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareAsc } from "date-fns";
import { ActivityTypes, OperationSystem, Platform } from "./constants/server";

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

export const servers = [
  ...Array.from({ length: 40 }, (_, i) => {
    const id = i + 1;

    const now = Date.now();

    // random created_at within last 30 days
    const createdAt = new Date(
      now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
    );

    // updated_at >= created_at && <= now
    const updatedAt = new Date(
      createdAt.getTime() +
        Math.floor(Math.random() * (now - createdAt.getTime())),
    );

    // weighted random helper
    const randomItem = (items: any) =>
      items[Math.floor(Math.random() * items.length)];

    // intentionally duplicated values to make chart data uneven
    const randomOS = randomItem([
      "Ubuntu",
      "Ubuntu",
      "Ubuntu",
      "Debian",
      "Debian",
      "CentOS",
      "Windows Server",
    ]);

    const randomPlatform = randomItem([
      "Nginx",
      "Nginx",
      "Nginx",
      "Apache",
      "Apache",
      "Docker",
      "NodeJS",
    ]);

    const randomLocationId = randomItem([
      1, 1, 1, 2, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10,
    ]);

    const randomStatus = randomItem([
      "Online",
      "Online",
      "Online",
      "Maintenance",
      "Offline",
    ]);

    const randomVersionMap = {
      Ubuntu: randomItem(["20.04", "22.04", "24.04"]),
      Debian: randomItem(["11", "12"]),
      CentOS: randomItem(["7", "8", "9"]),
      "Windows Server": randomItem(["2019", "2022"]),
    } as any;

    return {
      id,
      IP_address: `10.${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255,
      )}.${Math.floor(Math.random() * 255)}`,

      location_id: randomLocationId,

      name: `server-${id.toString().padStart(2, "0")}`,

      operation_system: randomOS,

      version: randomVersionMap[randomOS],

      platform: randomPlatform,

      sys_architecture: Math.random() > 0.2 ? "x64" : "x86",

      status: randomStatus,

      created_at: createdAt.toISOString(),

      updated_at: updatedAt.toISOString(),
    };
  }),
];

const activityTypes = Object.values(ActivityTypes);

export const serverActivities = [
  ...Array.from({ length: 50 }, (_, i) => {
    const id = i + 1;

    const now = Date.now();

    // random time within last 30 days
    const createdAt = new Date(
      now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000),
    );

    // updated_at must >= created_at and <= now
    const updatedAt = new Date(
      createdAt.getTime() +
        Math.floor(Math.random() * (now - createdAt.getTime())),
    );

    return {
      id,
      server_id: ((id - 1) % 40) + 1,
      activity_type: activityTypes[id % activityTypes.length],
      created_at: createdAt.toISOString(),
      updated_at: updatedAt.toISOString(),
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

export function groupServerByLocation() {
  return locations
    .map((location) => {
      const serverList = servers
        .filter((server) => server.location_id == location.id)
        .map((server) => ({ ...server, location: { ...location } }));
      return { ...location, servers: [...serverList] };
    })
    .filter((location) => location.servers.length > 0);
}

export function getStatisticalOS() {
  return Object.entries(OperationSystem).map((os) => {
    const countOS = servers.filter(
      (server) => server.operation_system == os[1],
    ).length;
    return {
      key: os[0],
      count: countOS,
    };
  });
}

export function getStatisticalPlatform() {
  return Object.entries(Platform).map((platform) => {
    const countPlatform = servers.filter(
      (server) => server.platform == platform[1],
    ).length;
    return {
      name: platform[1],
      count: countPlatform,
    };
  });
}

export function getStatisticalArchitecture() {
  const x64Count = servers.filter(
    (server) => server.sys_architecture == "x64",
  ).length;
  const x86Count = servers.filter(
    (server) => server.sys_architecture == "x86",
  ).length;

  return [
    { key: "x86", count: x86Count, totalServer: servers.length },
    { key: "x64", count: x64Count, totalServer: servers.length },
  ];
}
