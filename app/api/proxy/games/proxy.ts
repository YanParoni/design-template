import { inject, injectable } from 'inversify';
import { IGamesGateway } from '@infra/gateways/contracts/games';
import type { IHttpClient } from '@infra/http/contracts';

import IQueryParams from '@infra/gateways/contracts/query';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

@injectable()
export class GamesProxy implements IGamesGateway {
  constructor(
    @inject('HttpClient') private readonly httpClient: IHttpClient,
  ) {
  }

  async getGames(params?: IQueryParams): Promise<any> {
    if (params) {
      const url = `${BASE_URL}/games/${params}`;
      const response = this.httpClient.get({
        url
      })
      return response;
    }
    const url = `${BASE_URL}/games`;
    const response = await this.httpClient.get({
      url
    })
    return response.results
  }
}