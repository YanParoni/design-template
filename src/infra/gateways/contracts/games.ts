
export interface IGamesGateway {
  getGames: () => Promise<any>
  searchGame: (game: string) => Promise<any>
}