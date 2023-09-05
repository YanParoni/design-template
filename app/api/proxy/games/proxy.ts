import { inject, injectable } from 'inversify';
import TYPES from '@infra/http/types';
import { IGamesGateway } from '@infra/gateways/contracts/games';
import type { IHttpClient } from '@infra/http/contracts';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL

@injectable()
export class GamesProxy implements IGamesGateway {
  constructor(
    @inject(TYPES.FetchHttpClient) private readonly fetchHttpClient: IHttpClient  ) {
  }

  async getGames(): Promise<any> {
    const url = `${BASE_URL}/games`;
    const requestParams = {
      url,
      params: {
        key: process.env.RAWG_API_KEY!
      }
    };
    const response = await this.fetchHttpClient.get(requestParams);
    return response.results
  }
}