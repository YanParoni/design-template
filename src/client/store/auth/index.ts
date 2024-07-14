import { create } from "zustand";
import { AuthState, UserProfile } from "../types";

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  activeState: "default",
  login: (token: string, user: UserProfile) =>
    set({ isAuthenticated: true, token, user }),
  logout: () =>
    set({
      isAuthenticated: false,
      token: null,
      user: null,
      activeState: "default",
    }),
  setActiveState: (state) => set({ activeState: state }),
}));

export default useAuthStore;
