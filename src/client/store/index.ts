import { create } from 'zustand';

type GameState = {
  games: any[],
  setGames: (games: any[]) => void,
  getGameById: (id: number) => any| undefined,
  addGame: (game: any) => void;
};

const useGameStore = create<GameState>((set, get) => {
  const getGameById = (id: number): any | undefined => {
    const { games } = get();
    return games.find((game) => game.id === id);
  };

  const addGame = (game: any): void => {
    set((state) => {
        //@ts-ignore
      const updatedGames = [...state?.games, game];
      return { games: updatedGames };
    });
  };

  return {
    games: [],
    // @ts-ignore
    setGames: (games) => set(games),
    getGameById,
    addGame,
  };
});

export { useGameStore };
