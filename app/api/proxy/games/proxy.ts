import { inject, injectable } from 'inversify';
import TYPES from '@infra/http/types';
import { IGamesGateway } from '@infra/gateways/contracts/games';
import type { IHttpClient } from '@infra/http/contracts';
import IQueryParams from '@infra/gateways/contracts/query';


const BASE_URL = process.env.NEXT_PUBLIC_RAWG_API

const KEY = process.env.NEXT_PUBLIC_RAWG_KEY

@injectable()
export class GamesProxy implements IGamesGateway {
  constructor(
    @inject(TYPES.FetchHttpClient) private readonly fetchHttpClient: IHttpClient  ) {
  }

  async searchGame(args: IQueryParams): Promise<any>{
    const url = `${BASE_URL}/games`;
    const requestParams = {
      url,
      params: {
        key: KEY,
        ...args
      }
    };
    const response = await this.fetchHttpClient.get(requestParams);
    return response
  }
 
}


