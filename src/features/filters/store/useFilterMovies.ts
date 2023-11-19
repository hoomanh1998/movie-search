import { create } from "zustand";
import { Filter } from "@utils/types";

interface IFilterMovies {
  filters: Filter[];
  filtersListOpen: boolean;
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
  toggleFiltersList: () => void;
}

const filters: Filter[] = [
  { id: 1, title: "All", value: "" },
  { id: 2, title: "Movie", value: "movie" },
  { id: 3, title: "Series", value: "series" },
];

export const useFilterMovies = create<IFilterMovies>((set) => ({
  filters: filters,
  filtersListOpen: false,
  activeFilter: filters[0],
  setActiveFilter: (filter) => {
    set(() => ({ activeFilter: filter }));
  },
  toggleFiltersList: () => {
    set((state) => ({
      filtersListOpen: !state.filtersListOpen,
    }));
  },
}));
