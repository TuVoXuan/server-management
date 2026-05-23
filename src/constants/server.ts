export const OperationSystem = {
  ubuntu: "Ubuntu",
  debian: "Debian",
  centOS: "CentOS",
  windowsServer: "Windows Server",
};

export const Platform = {
  nginx: "Nginx",
  apache: "Apache",
  docker: "Docker",
  nodeJS: "NodeJS",
};

export const ServerStatus = {
  online: "Online",
  offline: "Offline",
};

export const ActivityTypes = {
  SERVER_CREATED: "SERVER_CREATED",
  SERVER_UPDATED: "SERVER_UPDATED",
  SERVER_RESTARTED: "SERVER_RESTARTED",
  SERVER_STOPPED: "SERVER_STOPPED",
  SERVER_STARTED: "SERVER_STARTED",
};

export const ActivityColors = {
  SERVER_CREATED: "#22C55E", // green
  SERVER_UPDATED: "#3B82F6", // blue
  SERVER_RESTARTED: "#F59E0B", // amber
  SERVER_STOPPED: "#EF4444", // red
  SERVER_STARTED: "#8B5CF6", // purple
};
