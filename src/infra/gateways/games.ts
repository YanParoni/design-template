import { inject, injectable } from "inversify";
import TYPES from "@infra/http/types";
import IQueryParams from "./contracts/query";
import type { IHttpClient } from "../http/contracts";
import { IGamesGateway } from "./contracts/games";

interface IRequestParams {
  url: string;
  params?: IQueryParams;
  data?: IQueryParams;
}

const BASE_URL = process.env.NEXT_PUBLIC_RAWG_API;

const KEY = process.env.NEXT_PUBLIC_RAWG_KEY;


@injectable()
export class GamesGateway implements IGamesGateway {
  constructor(
    @inject(TYPES.FetchHttpClient)
    private readonly fetchHttpClient: IHttpClient,
  ) {}

  async searchGame(args: IQueryParams): Promise<any> {
    const url = `${BASE_URL}/games`;
    const requestParams = {
      url,
      params: {
        key: KEY,
        ...args,
      },
    };
    const response = await this.fetchHttpClient.get(requestParams);
    return response.data;
  }
}
