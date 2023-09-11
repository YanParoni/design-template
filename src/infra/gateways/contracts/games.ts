
export interface IGamesGateway {
  getGames: (page: string) => Promise<any>
  searchGame: (game: string) => Promise<any>
}