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
