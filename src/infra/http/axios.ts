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
  ): Promise<HttpClientDTO.Output<T>> {
    try {
      const response = await callback();
      return { data: response.data, error: null };
    } catch (error: any) {
      console.log(error)
      return { data: null as any, error: error.response?.data?.message || error.message };
    }
  }

  private async axiosRequest<T>(
    config: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.request<T>(config);
  }

  async get<T>({
    url,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    return this.thrower(() =>
      this.axiosRequest<T>({ url, headers, params, method: "get" }),
    );
  }

  async post<T>({
    url,
    data,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    return this.thrower(() =>
      this.axiosRequest<T>({ url, data, headers, params, method: "post" }),
    );
  }

  async put<T>({
    url,
    data,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    return this.thrower(() =>
      this.axiosRequest<T>({ url, data, headers, params, method: "put" }),
    );
  }

  async patch<T>({
    url,
    data,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    return this.thrower(() =>
      this.axiosRequest<T>({ url, data, headers, params, method: "patch" }),
    );
  }

  async delete<T>({
    url,
    headers,
    params,
  }: HttpClientDTO.Input): Promise<HttpClientDTO.Output<T>> {
    return this.thrower(() =>
      this.axiosRequest<T>({ url, headers, params, method: "delete" }),
    );
  }
}
