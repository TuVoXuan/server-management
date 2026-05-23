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
  SERVER_DELETED: "SERVER_DELETED",
};

export const activityDescriptions = {
  SERVER_CREATED: [
    "Server instance has been provisioned",
    "New server added to infrastructure",
    "Server configuration initialized",
    "Server successfully deployed",
    "A new server is now available",
  ],
  SERVER_UPDATED: [
    "System configuration updated",
    "Server settings were modified",
    "Security patches applied",
    "Server metadata has been updated",
    "Software packages updated",
  ],
  SERVER_RESTARTED: [
    "Server restarted successfully",
    "System reboot completed",
    "Restart triggered for maintenance",
    "Server services reinitialized",
    "Server reboot process finished",
  ],
  SERVER_STOPPED: [
    "Server has been shut down",
    "All running services stopped",
    "Server stopped for maintenance",
    "Server is no longer active",
    "Shutdown process completed",
  ],
  SERVER_STARTED: [
    "Server is back online",
    "All services started successfully",
    "Server boot completed",
    "System startup finished",
    "Server is now operational",
  ],
  SERVER_DELETED: [
    "Server has been permanently removed",
    "Server instance deleted successfully",
    "Infrastructure resource was deleted",
    "Server removed from the system",
    "Server cleanup completed",
  ],
};
