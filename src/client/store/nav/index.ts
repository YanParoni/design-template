import { create } from "zustand";
import { NavState } from "../types";

const useNavStore = create<NavState>((set) => ({
  activeState: "default",

  setActiveState: (state) => set({ activeState: state }),
}));

export default useNavStore;
