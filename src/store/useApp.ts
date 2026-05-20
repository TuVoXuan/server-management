import type { NavItem } from "@/types";
import { create } from "zustand";

interface AppState {
  activeNav: NavItem | undefined;
  setActiveNav: (navItem: NavItem | undefined) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  activeNav: undefined,
  setActiveNav: (navItem) => set(() => ({ activeNav: navItem })),
}));
