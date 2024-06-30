import { injectable } from 'inversify';
import { HttpClientDTO, IHttpClient } from './contracts';


@injectable()
export class FetchHttpClient implements IHttpClient {
  constructor() {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  private async thrower(callback: Function) {
    try {
      return await callback();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  private async fetchRequest(input: RequestInfo, init?: RequestInit): Promise<HttpClientDTO.Output> {
    console.log(input,  'fetch request', init)
    const response = await fetch(input, init);
    
    if (!response.ok) {
      throw new Error(`Fetch request failed: ${response.status}`);
    }
    return await response.json();
  }

  async get({ url, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    console.log(url,'http')
    const hasParams = params && Object.keys(params).length > 0;
    const queryParams = hasParams ? new URLSearchParams(params).toString() : '';
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;
    return await this.thrower(() => this.fetchRequest(fullUrl, { headers, method: 'GET' }));
  }
  

  async post({ url, data, headers}: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    return await this.thrower(() =>this.fetchRequest(url, { body: JSON.stringify(data), headers, method: 'POST' })
    );
  }

  async put({ url, data, headers }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    return await this.thrower(() =>
      this.fetchRequest(url, { body: JSON.stringify(data), headers, method: 'PUT' })
      );
  }

  async patch({ url, data, headers }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    return await this.thrower(() =>
      this.fetchRequest(url, { body: JSON.stringify(data), headers, method: 'PATCH' })
    );
  }

  async delete({ url, headers,}: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    return await this.thrower(() => this.fetchRequest(url, { headers, method: 'DELETE' }));
  }
}
