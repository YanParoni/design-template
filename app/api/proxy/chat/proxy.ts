import { inject, injectable } from 'inversify';
import TYPES from '@infra/http/types';
import type { IHttpClient } from '@infra/http/contracts';
import { IChatGateway } from '@infra/gateways/contracts/chat';

const OPEN_API_URL = process.env.OPEN_API_URL
const OPEN_API_TOKEN = process.env.OPEN_API_TOKEN
@injectable()
export class ChatProxy implements IChatGateway {
  constructor(
    @inject(TYPES.FetchHttpClient) private readonly fetchHttpClient: IHttpClient  ) {
  }

  async getCompletion(params: any): Promise<any> {
    const url = `${OPEN_API_URL}`;
     const headers =  {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPEN_API_TOKEN}`,
        'OpenAI-Organization': 'org-nBJTrAgA9dEQRz9c1iwInXlF'
      }
    const response = await this.fetchHttpClient.post({url, headers, data:params});
    return response
  }
}