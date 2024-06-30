export type FiltersState = {
  genre: string | null;
  platform: number | null;
  store: number | null;
  search: string;
  setGenre: (genre: string | null) => void;
  setPlatform: (platform: number | null) => void;
  setStore: (store: number | null) => void;
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
  next: null | string;
  previous: null | string;
};

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}
