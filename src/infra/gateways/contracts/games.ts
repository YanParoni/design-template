import IQueryParams from "./query"

export interface IGamesGateway {
  getGames: (params?: IQueryParams) => Promise<any>
}