import IQueryParams from "./query";
export interface IGamesGateway {
  searchGame: (args: IQueryParams) => Promise<any>;
}
