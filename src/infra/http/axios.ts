import { injectable } from 'inversify';
import { HttpClientDTO, IHttpClient } from './contracts';
import 'reflect-metadata';
import AuthInterceptor from './interceptors/auth-interceptor';

@injectable()
export class AxiosHttpClient implements IHttpClient {
  private axiosInstance;

  constructor() {
    this.axiosInstance = AuthInterceptor;
    this.axiosInstance.defaults.headers['Content-Type'] = 'application/json';
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private async thrower(callback: Function) {
    try {
      return await callback();
    } catch (error: any) {
      console.log(error.response?.data.message);
    }
  }

  async get({ url, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const result = await this.axiosInstance.request({
      url,
      headers,
      params,
      method: 'get'
    });
    return result;
  }

  async post({ url, data, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const result = await this.thrower(async () => {
      return await this.axiosInstance.request({
        url,
        data,
        headers,
        params,
        method: 'post'
      });
    });
    return result.data;
  }

  async put({ url, data, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const result = await this.thrower(async () => {
      return await this.axiosInstance.request({
        url,
        data,
        headers,
        params,
        method: 'put'
      });
    });
    return result.data;
  }

  async patch({ url, data, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const result = await this.thrower(async () => {
      return await this.axiosInstance.request({
        url,
        data,
        headers,
        params,
        method: 'patch'
      });
    });
    return result.data;
  }

  async delete({ url, data, headers, params }: HttpClientDTO.Input): Promise<HttpClientDTO.Output> {
    const result = await this.thrower(async () => {
      return await this.axiosInstance.request({
        url,
        data,
        headers,
        params,
        method: 'delete'
      });
    });
    return result.data;
  }
}
