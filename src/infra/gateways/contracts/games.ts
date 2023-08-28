import IQueryParams from "./query"
import { Game } from "@entities/games"

export interface IGamesGateway {
  getGames: (params?: IQueryParams) => Promise<any>
}