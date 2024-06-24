import { create } from 'zustand';
import { FiltersState, PaginationState, GameState, GameResponse } from './types';

const useGameStore = create<GameState>((set, get) => {
  const initialState: GameResponse = {
    count: 0,
    results: [],
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

const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  pageSize: 40,
  setCurrentPage: (page) => set(() => ({ currentPage: page })),
  setPageSize: (size) => set(() => ({ pageSize: size })),
}));


const useFilterStore = create<FiltersState>((set) => ({
  genres: [],
  platforms: [],
  stores: [],
  search: '',
  addGenre: (genre: string) => {
    set((state) => ({
      genres: state.genres.includes(genre) ? state.genres : [...state.genres, genre],
    }));
  },
  setGenres: (genres: string[]) => {
    set({ genres });
  },
  addPlatform: (platform: string) => {
    set((state) => ({
      platforms: state.platforms.includes(platform) ? state.platforms : [...state.platforms, platform],
    }));
  },
  setPlatforms: (platforms: string[]) => {
    set({ platforms });
  },
  removePlatform: (platform: string) => {
    set((state) => ({
      platforms: state.platforms.filter((item) => item !== platform),
    }));
  },
  addStore: (store: string) => {
    set((state) => ({
      stores: state.stores.includes(store) ? state.stores : [...state.stores, store],
    }));
  },
  setStores: (stores: string[]) => {
    set({ stores });
  },
  removeStore: (store: string) => {
    set((state) => ({
      stores: state.stores.filter((item) => item !== store),
    }));
  },
  resetFilters: () => {
    set({
      genres: [],
      platforms: [],
      stores: [],
    });
  },
  setSearch: (search: string) => {
    set({ search });
  },
}));



export { useGameStore, usePaginationStore, useFilterStore };
