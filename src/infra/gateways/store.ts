import { inject, injectable } from 'inversify';
import IQueryParams from './contracts/query';
import type { IHttpClient } from '../http/contracts';
import { IStoreInfoGateway } from './contracts/store';

const BASE_URL = 'api/proxy'

interface IRequestParams {
  url: string;
  params?: IQueryParams;
}

@injectable()
export class StoreInfoGateway implements IStoreInfoGateway {
  constructor(
    @inject('HttpClient') private readonly httpClient: IHttpClient,
  ) {
  }

  async getStores(params?: IQueryParams): Promise<any> {
    const url = `${BASE_URL}/stores`;
    const requestParams: IRequestParams = { url };
  
    if (params) {
      requestParams.params = params;
      const response = await this.httpClient.get(requestParams);
      return response.data;
    }
    const response = await this.httpClient.get(requestParams);
    return  response
  }
}