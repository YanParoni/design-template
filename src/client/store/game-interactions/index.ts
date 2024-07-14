import { create } from "zustand";
import { GameInteractionsState } from "../types";

const useGameInteractionsStore = create<GameInteractionsState>((set) => ({
  gameInteractions: [],
  setGameInteractions: (interactions) =>
    set({ gameInteractions: interactions }),
}));

export default useGameInteractionsStore;
