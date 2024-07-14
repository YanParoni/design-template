import { create } from "zustand";
import { GameState, GameResponse } from "../types";

const useGameStore = create<GameState>((set, get) => {
  const initialState: GameResponse = {
    count: 0,
    results: [],
    next: null,
    previous: null,
  };

  const getGameByName = (name: string): any | undefined => {
    const { games } = get();
    return games.results.find((game: any) => game.name === name);
  };

  const addGame = (game: any): void => {
    set((state) => {
      const updatedGames: GameResponse = {
        ...state.games,
        results: [...state.games.results, game],
      };
      return { games: updatedGames };
    });
  };

  return {
    games: initialState,
    setGames: (games) => set({ games }),
    getGameByName,
    addGame,
  };
});

export default useGameStore;
