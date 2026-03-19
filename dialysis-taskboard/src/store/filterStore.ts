import { create } from "zustand";
import type { Role, TimeFilter } from "../types";

interface FilterStore {
  roles: Role[];
  timeFilter: TimeFilter;
  searchQuery: string;
  setRoles: (roles: Role[]) => void;
  setTimeFilter: (f: TimeFilter) => void;
  setSearchQuery: (q: string) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  roles: [],
  timeFilter: "all",
  searchQuery: "",
  setRoles: (roles) => set({ roles }),
  setTimeFilter: (timeFilter) => set({ timeFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  reset: () => set({ roles: [], timeFilter: "all", searchQuery: "" }),
}));