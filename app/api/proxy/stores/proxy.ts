import { inject, injectable } from "inversify";
import TYPES from "@infra/http/types";
import { IStoreInfoGateway } from "@infra/gateways/contracts/store";
import type { IHttpClient } from "@infra/http/contracts";
import IQueryParams from "@infra/gateways/contracts/query";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

@injectable()
export class StoreInfoProxy implements IStoreInfoGateway {
  constructor(
    @inject(TYPES.FetchHttpClient)
    private readonly fetchHttpClient: IHttpClient,
  ) {}

  async getStores(params?: IQueryParams): Promise<any> {
    if (params) {
      const url = `${BASE_URL}/stores/${params}`;
      const response = this.fetchHttpClient.get({
        url,
      });
      return response;
    }
  }
}
