import { create } from 'zustand';
import { FiltersState, PaginationState, GameState, GameResponse, AuthState, UserProfile } from './types';

const useFilterStore = create<FiltersState>((set) => ({
  genre: null,
  platform: null,
  store: null,
  search: '',
  setGenre: (genre: string | null) => set({ genre }),
  setPlatform: (platform: number | null) => set({ platform }),
  setStore: (store: number | null) => set({ store }),
  resetFilters: () => set({ genre: null, platform: null, store: null, search: '' }),
  setSearch: (search: string ) => set({ search }),
}));

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,
  activeState: 'default',
  login: (token: string, user: UserProfile) => set({ isAuthenticated: true, token, user }),
  logout: () => set({ isAuthenticated: false, token: null, user: null }),
  setActiveState: (state) => set({ activeState: state }),
}));

const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  pageSize: 40,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setPageSize: (size: number) => set({ pageSize: size }),
}));

const useGameStore = create<GameState>((set, get) => {
  const initialState: GameResponse = {
    count: 0,
    results: [],
    next: null,
    previous:null,
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

export { useFilterStore, usePaginationStore, useGameStore, useAuthStore };
