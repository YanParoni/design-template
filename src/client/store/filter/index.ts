import { create } from "zustand";
import { FiltersState } from "../types";

const useFilterStore = create<FiltersState>((set) => ({
  genre: null,
  platform: null,
  store: null,
  search: "",
  setGenre: (genre: string | null) => set({ genre }),
  setPlatform: (platform: number | null) => set({ platform }),
  setStore: (store: number | null) => set({ store }),
  resetFilters: () =>
    set({ genre: null, platform: null, store: null, search: "" }),
  setSearch: (search: string) => set({ search }),
}));

export default useFilterStore;
