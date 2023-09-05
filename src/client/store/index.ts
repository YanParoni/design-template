import { create } from 'zustand';
import { Game } from '@entities/games';

type GameState = {
  games: any,
  setGames: (games: any) => void,
  addGame: (game: Game) => void,
  getGameById: (id: number) => any | undefined  
}

const useGameStore = create<GameState>((set, get) => {
  const getGameById = (id: number): any | undefined  => { 
    const { games } = get();
    return games?.games?.filter((game: any) => game.id === id);
  };

  return {
    games: [],
    setGames: (games) => set({ games }),
    addGame: (game) => set((state) => ({ games: [...state.games, game] })),
    getGameById,
  };
});

export { useGameStore };
