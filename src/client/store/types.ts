export type FiltersState = {
  genres: string[];
  platforms: string[];
  stores: string[];
  search: string;
  addGenre: (genre: string) => void;
  setGenres: (genres: string[]) => void;
  addPlatform: (platform: string) => void;
  setPlatforms: (platforms: string[]) => void;
  removePlatform: (platform: string) => void;
  addStore: (store: string) => void;
  setStores: (stores: string[]) => void;
  removeStore: (store: string) => void;
  resetFilters: () => void;
  setSearch: (search: string) => void;
};

export type PaginationState = {
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
};

export type GameState = {
  games: GameResponse;
  setGames: (games: GameResponse) => void;
  getGameByName: (name: string) => any | undefined;
  addGame: (game: any) => void;
};


export type GameResponse = {
  count: number;
  results: any[];
};