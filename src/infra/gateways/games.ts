import { inject, injectable } from 'inversify';
import IQueryParams from './contracts/query';
import type { IHttpClient } from '../http/contracts';
import { IGamesGateway } from './contracts/games';

const BASE_URL = 'api/proxy'
interface IRequestParams {
  url: string;
  params?: IQueryParams;
}
@injectable()
export class GamesGateway implements IGamesGateway {
  constructor(
    @inject('HttpClient') private readonly httpClient: IHttpClient,
  ) {
  }

  async getGames(): Promise<any> {
    const url = `${BASE_URL}/games`;
    const requestParams: IRequestParams = { url };
    const response = await this.httpClient.get(requestParams);
    return response
  }
}