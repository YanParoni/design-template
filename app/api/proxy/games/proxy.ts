import { inject, injectable } from 'inversify';
import { IGamesGateway } from '@infra/gateways/contracts/games';
import type { IHttpClient } from '@infra/http/contracts';


const BASE_URL = process.env.NEXT_PUBLIC_API_URL

@injectable()
export class GamesProxy implements IGamesGateway {
  constructor(
    @inject('HttpClient') private readonly httpClient: IHttpClient,
  ) {
  }

  async getGames(): Promise<any> {
    const url = `${BASE_URL}/games`;
    const response = await this.httpClient.get({
      url
    })
    return response.results
  }
}