import { create } from "zustand";
import { AlertState, AlertType } from "../types";

const useAlertStore = create<AlertState>((set) => ({
  message: "",
  type: "success",
  isVisible: false,
  showAlert: (message: string, type: AlertType) =>
    set({ message, type, isVisible: true }),
  hideAlert: () => set({ isVisible: false }),
}));

export default useAlertStore;
