import { create } from "zustand";

interface IFirstNode {
  firstNodeId: string;
  firstNodeIdChanged: boolean;
  setFirstNodeIdChanged: (flag: boolean) => void;
  setFirstNodeId: (id: string) => void;
  resetFirstNodeId: () => void;
}

export const useFirstNode = create<IFirstNode>((set) => ({
  firstNodeId: "",
  firstNodeIdChanged: false,
  setFirstNodeIdChanged: (flag) => set({ firstNodeIdChanged: flag }),
  setFirstNodeId: (id) => set({ firstNodeId: id }),
  resetFirstNodeId: () => set({ firstNodeId: "" }),
}));
