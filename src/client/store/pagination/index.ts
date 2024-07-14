import { create } from "zustand";
import { PaginationState } from "../types";

const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  pageSize: 40,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setPageSize: (size: number) => set({ pageSize: size }),
}));

export default usePaginationStore;
