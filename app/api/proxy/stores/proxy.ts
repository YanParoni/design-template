import { inject, injectable } from 'inversify';
import { IStoreInfoGateway } from '@infra/gateways/contracts/store';
import type { IHttpClient } from '@infra/http/contracts';
import IQueryParams from '@infra/gateways/contracts/query';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

@injectable()
export class StoreInfoProxy implements IStoreInfoGateway {
  constructor(
    @inject('HttpClient') private readonly httpClient: IHttpClient,
  ) {
  }

  async getStores(params?: IQueryParams): Promise<any> {
    if (params) {
        const url = `${BASE_URL}/stores/${params}`;
        const response = this.httpClient.get({
          url
        })
        return response;
      }
      const url = `${BASE_URL}/stores`;
      const response = await this.httpClient.get({
        url
      })

      return response
    }
}