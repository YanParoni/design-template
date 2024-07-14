import { injectable } from "inversify";
import { HttpClientDTO, IHttpClient } from "./contracts";
import "reflect-metadata";
import AuthInterceptor from "./interceptors/auth-interceptor";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

@injectable()
export class AxiosHttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = AuthInterceptor;
    this.axiosInstance.defaults.headers["Content-Type"] = "application/json";
  }

  private async thrower<T>(
    callback: () => Promise<AxiosResponse<T>>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await callback();
    } catch (error: any) {
      throw error;
    }
  }

  private async axiosRequest<T>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await this.axiosInstance.request<T>(config);
    if (response.status >= 400) {
      throw new Error(`Axios request failed: ${response.status}`);
    }
    return response;
  }

  async get<T>({
    url,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    const result = await this.thrower(() =>
      this.axiosRequest<T>({ url, headers, params, method: "get" }),
    );
    return { data: result.data };
  }

  async post<T>({
    url,
    data,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    const result = await this.thrower(() =>
      this.axiosRequest<T>({ url, data, headers, params, method: "post" }),
    );
    return { data: result.data };
  }

  async put<T>({
    url,
    data,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    const result = await this.thrower(() =>
      this.axiosRequest<T>({ url, data, headers, params, method: "put" }),
    );
    return { data: result.data };
  }

  async patch<T>({
    url,
    data,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    const result = await this.thrower(() =>
      this.axiosRequest<T>({ url, data, headers, params, method: "patch" }),
    );
    return { data: result.data };
  }

  async delete<T>({
    url,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    const result = await this.thrower(() =>
      this.axiosRequest<T>({ url, headers, params, method: "delete" }),
    );
    return { data: result.data };
  }
}
