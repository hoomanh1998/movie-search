import { create } from "zustand";

interface IScrollToTop {
  isScrollBtnShown: boolean;
  showScrollBtn: (flag: boolean) => void;
}

export const useScrollToTop = create<IScrollToTop>((set) => ({
  isScrollBtnShown: false,
  showScrollBtn: (flag) => set({ isScrollBtnShown: flag }),
}));
