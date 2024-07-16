export interface UserProfile {
  id: string;
  username: string;
  at: string;
  email: string;
  profileImage: string;
  headerImage: string;
  bio: string;
  isPrivate: boolean;
  followers: string[];
  following: string[];
  blockedUsers: string[];
  favorites: string[];
  reviews: string[];
  likes: string[];
}

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

export type NavState = {
  activeState: "default" | "login" | "signup" | "logged";
  setActiveState: (state: "default" | "login" | "signup" | "logged") => void;
};

export interface GameInteraction {
  id: string;
  userId: string;
  gameId: string;
  liked: boolean;
  played: boolean;
}

export interface GameInteractionsState {
  gameInteractions: GameInteraction[];
  setGameInteractions: (interactions: GameInteraction[]) => void;
}

export type AlertType = "success" | "error";

export interface AlertState {
  message: string;
  type: AlertType;
  isVisible: boolean;
  showAlert: (message: string, type: AlertType) => void;
  hideAlert: () => void;
}

export interface ModalStoreState {
  isVisible: boolean;
  isCropping: boolean;
  editMode: "profile" | "header" | null;
  selectedImage: string | null;
  localProfileImage: string | null;
  localHeaderImage: string | null;
  croppedAreaPixels: any;
  hasChanges: boolean;
  passwordModal: boolean;
  handlePasswordModal: (value: boolean) => void;
  setHasChanges: () => void;
  openModal: () => void;
  closeModal: () => void;
  startCropping: () => void;
  stopCropping: () => void;
  setSelectedImage: (image: string | null) => void;
  setCroppedAreaPixels: (area: any) => void;
  saveCroppedImage: () => void;
  setEditMode: (mode: "profile" | "header") => void;
  resetState: () => void;
}

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  needsSetup: boolean;
  oAuth: boolean;
  setOauth: (needsSetup: boolean, oAuth: boolean) => void;
  refetchProfile: () => any;
  setAuth: (isAuthenticated: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setRefetchProfile: (refetch: () => void) => void;
  setUser: (user: UserProfile) => void;
};
