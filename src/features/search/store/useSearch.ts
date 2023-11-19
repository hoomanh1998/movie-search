import { create } from "zustand";

interface Search {
  query: string;
  setQuery: (q: string) => void;
  recentSearchQueries: string[];
  addToRecentSearch: (q?: string) => void;
  removeFromRecentSearch: (q: string) => void;
}

export const useSearch = create<Search>((set, get) => ({
  query: "",
  setQuery: (q) => {
    set(() => ({ query: q }));
  },
  recentSearchQueries: [],
  addToRecentSearch: (q) => {
    let searchQuery: string;
    if (q) {
      searchQuery = q;
    } else {
      const { query } = get();
      searchQuery = query.trim();
    }
    set((state: Search) => {
      const { recentSearchQueries } = get();
      return recentSearchQueries.includes(searchQuery)
        ? { recentSearchQueries }
        : {
            recentSearchQueries: [...state.recentSearchQueries, searchQuery],
          };
    });
  },
  removeFromRecentSearch: (q) => {
    set(() => {
      const { recentSearchQueries } = get();
      const remainSearchQueries = recentSearchQueries.filter(
        (recentSearch) => recentSearch !== q
      );
      return { recentSearchQueries: remainSearchQueries };
    });
  },
}));
