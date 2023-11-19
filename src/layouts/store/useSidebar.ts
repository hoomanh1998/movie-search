import { create } from "zustand";

interface Sidebar {
  isOpen: boolean;
  openSidebarHandler: () => void;
  closeSidebarHandler: () => void;
}

export const useSidebar = create<Sidebar>((set) => ({
  isOpen: false,
  openSidebarHandler: () => set(() => ({ isOpen: true })),
  closeSidebarHandler: () => set(() => ({ isOpen: false })),
}));
