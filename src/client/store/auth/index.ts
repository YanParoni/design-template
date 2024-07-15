import { create } from "zustand";
import { AuthState } from "../types";

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  oAuth: false,
  needsSetup: false,
  setOauth: (needsSetup, oAuth) => set({ oAuth, needsSetup }),
  refetchProfile: () => {},
  setAuth: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (isLoading) => set({ isLoading }),
  setRefetchProfile: (refetch) => set({ refetchProfile: refetch }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
