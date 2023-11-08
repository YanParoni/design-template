import { inject, injectable } from 'inversify';
import TYPES from '@infra/http/types';
import IQueryParams from './contracts/query';
import type { IHttpClient } from '../http/contracts';
import { IGamesGateway } from './contracts/games';

interface IRequestParams {
  url: string;
  params?: IQueryParams;
  data?: IQueryParams
}
const BASE = process.env.NEXT_PUBLIC_API_URL

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP === 'production' ?'https://design-template-ivory.vercel.app':'http://localhost:3000'
@injectable()
export class GamesGateway implements IGamesGateway {
  constructor(
    @inject(TYPES.FetchHttpClient) private readonly fetchHttpClient: IHttpClient,  ) {
  }



  async searchGame(args: IQueryParams): Promise<any>{
    const url = `${BASE_URL}/api/proxy/games/search`;
    const requestParams: IRequestParams = { url, data: args };
    try {
      const response = await this.fetchHttpClient.put(requestParams);
      return response
    } catch (error) {
      console.error(error);
    }
  }   

  async platforms(): Promise<any>{
    const url = `${BASE}/`;
    const requestParams = {
      url:'https://api.rawg.io/api/platforms/lists/parents',
      params: {
        key: '75c5b1db3d7e4caf99462d5df662c9c5', 
    }
    };
    try {
      const response = await this.fetchHttpClient.get(requestParams);
      return response
    } catch (error) {
      console.error(error);
    }
  }
}