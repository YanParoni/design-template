import { injectable, inject } from "inversify";
import { HttpClientDTO, IHttpClient } from "./contracts";
import type { IAuthMiddleware } from "@infra/gateways/contracts/auth-middleware";
import TYPES from "./types";

@injectable()
export class FetchHttpClient implements IHttpClient {
  constructor(
    @inject(TYPES.AuthMiddleware)
    private readonly authMiddleware: IAuthMiddleware,
  ) {}

  private async thrower<T>(
    callback: () => Promise<HttpClientDTO.Output<T>>,
  ): Promise<HttpClientDTO.Output<T>> {
    try {
      return await callback();
    } catch (error: any) {
      console.log(error.message);
      return { data: null as any, error: error.message };
    }
  }

  private async fetchRequest<T>(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<HttpClientDTO.Output<T>> {
    const response = await fetch(input, init);

    let responseBody: T;
    try {
      responseBody = await response.json();
    } catch (error) {
      responseBody = {} as T;
    }

    if (!response.ok) {
      return {
        data: responseBody,
        error: `Fetch request failed: ${response.status}`,
      };
    }

    return {
      data: responseBody,
      error: null,
    };
  }

  async get<T>({
    url,
    headers = {},
    params,
    addAuth = false,
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<
    HttpClientDTO.Output<T>
  > {
    const fullHeaders = this.authMiddleware.apply(headers, addAuth);
    const hasParams = params && Object.keys(params).length > 0;
    const queryParams = hasParams ? new URLSearchParams(params).toString() : "";
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;
    return await this.fetchRequest<T>(fullUrl, {
      headers: fullHeaders,
      method: "GET",
    });
  }

  async post<T>({
    url,
    data,
    headers = {},
    addAuth = false,
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<
    HttpClientDTO.Output<T>
  > {
    const fullHeaders = this.authMiddleware.apply(headers, addAuth);
    return await this.thrower(() =>
      this.fetchRequest<T>(url, {
        body: JSON.stringify(data),
        headers: fullHeaders,
        method: "POST",
      }),
    );
  }

  async put<T>({
    url,
    data,
    headers = {},
    addAuth = false,
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<
    HttpClientDTO.Output<T>
  > {
    const fullHeaders = this.authMiddleware.apply(headers, addAuth);
    return await this.thrower(() =>
      this.fetchRequest<T>(url, {
        body: JSON.stringify(data),
        headers: fullHeaders,
        method: "PUT",
      }),
    );
  }

  async patch<T>({
    url,
    data,
    headers = {},
    addAuth = false,
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<
    HttpClientDTO.Output<T>
  > {
    const fullHeaders = this.authMiddleware.apply(headers, addAuth);
    return await this.thrower(() =>
      this.fetchRequest<T>(url, {
        body: JSON.stringify(data),
        headers: fullHeaders,
        method: "PATCH",
      }),
    );
  }

  async delete<T>({
    url,
    headers = {},
    addAuth = false,
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<
    HttpClientDTO.Output<T>
  > {
    const fullHeaders = this.authMiddleware.apply(headers, addAuth);
    return await this.thrower(() =>
      this.fetchRequest<T>(url, { headers: fullHeaders, method: "DELETE" }),
    );
  }
}
