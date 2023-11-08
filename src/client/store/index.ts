import { create } from 'zustand';

export type GameResponse = {
  count: number;
  results: any[];
};

type GameState = {
  games: GameResponse;
  setGames: (games: GameResponse) => void;
  getGameByName: (name: string) => any | undefined;
  addGame: (game: any) => void;
};

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

type PaginationState = {
  currentPage: number
  setCurrentPage: (page: number) => void;
}

const usePaginationStore = create<PaginationState>((set) => ({
    currentPage:2,
    setCurrentPage:(page)=>set(() => ({ currentPage: page }))
}))

type FiltersState = {
  genres: string[];
  platforms: string[];
  search:string
  rating: {
    min: string;
    max: string;
  };
  addGenre: (genre: string) => void;
  addPlatform: (platform: string) => void;
  removePlatform: (platform: string) => void;
  addRating: (min: string, max: string) => void;
  resetFilters: () => void;
  setSearch: (search: string) => void;

};

const useFilterStore = create<FiltersState>((set) => ({
  genres: [],
  platforms: [],
  search:'',
  rating: { min: '0', max: '100' },
  addGenre: (genre: string) => {
    set((state) => ({
      genres: state.genres.includes(genre) ? state.genres : [...state.genres, genre],
      platforms: state.platforms,
      rating: state.rating,
      search: state.search
    }));
  },
 addPlatform: (platform: string) => {
    set((state) => ({
      genres: state.genres,
      platforms: state.platforms.includes(platform) ? state.platforms : [...state.platforms, platform],
      rating: state.rating,
      search: state.search
    }));
  },
 removePlatform: (platform: string) => {
    set((state) => ({
      genres: state.genres,
      platforms: state.platforms.filter(item => item !== platform),
      rating: state.rating,
      search: state.search
    }));
  },
  addRating: (min: string, max: string) => {
    set((state) => ({
      genres: state.genres,
      platforms: state.platforms,
      rating: {
        min: min,
        max: max,
      },
      search: state.search
    }));
  },
  resetFilters: () => {
    set({
      genres: [],
      platforms: [],
      rating: { min: '0', max: '100' },
    });
  },
  setSearch: (search: string) => {
    set({ search });
  },
}));

export { useGameStore, usePaginationStore,useFilterStore };
