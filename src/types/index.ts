export interface NavItem {
  title: string;
  url: string;
  icon: React.ReactNode;
  isActive?: boolean;
  items?: NavItemChild[];
}

export interface NavItemChild {
  title: string;
  url: string;
}

export interface ILocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface IServer {
  id: number;
  IP_address: string;
  location_id: number;
  location?: ILocation;
  name: string;
  operation_system: string;
  version: string;
  platform: string;
  sys_architecture: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface IServerActivity {
  serverName: string;
  description: string;
  createdAt: number;
  activityType: string;
  serverId: number;
}
