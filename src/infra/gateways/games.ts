import { inject, injectable } from 'inversify';
import TYPES from '@infra/http/types';
import IQueryParams from './contracts/query';
import type { IHttpClient } from '../http/contracts';
import { IGamesGateway } from './contracts/games';

const BASE_URL  = 'api/proxy'
interface IRequestParams {
  url: string;
  params?: IQueryParams;
}

@injectable()
export class GamesGateway implements IGamesGateway {
  constructor(
    @inject(TYPES.FetchHttpClient) private readonly fetchHttpClient: IHttpClient,  ) {
  }

  async getGames(page: string): Promise<any> {
    const baseUrl = `${BASE_URL}/games`;
    const requestParams: IRequestParams = { url:baseUrl, params:{page}};
    const response = await this.fetchHttpClient.get(requestParams);
    return response
  }

  async searchGame(game: string): Promise<any>{
    const url = `${BASE_URL}/games/search`;
    const params = {
      search:game
    }
    const requestParams: IRequestParams = { url, params };
    try {
      const response = await this.fetchHttpClient.get(requestParams);
      return response
    } catch (error) {
      console.error(error);
    }
  }   
}