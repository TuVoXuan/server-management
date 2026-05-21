import type { NavItem, NavItemChild } from "@/types";
import { create } from "zustand";

interface AppState {
  activeNav:
    | {
        parent: NavItem | undefined;
        children: NavItemChild | undefined;
      }
    | undefined;
  setActiveNav: (
    navItem:
      | {
          parent: NavItem | undefined;
          children: NavItemChild | undefined;
        }
      | undefined,
  ) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  activeNav: undefined,
  setActiveNav: (navItem) => set(() => ({ activeNav: navItem })),
}));
