import { injectable, inject } from "inversify";
import { HttpClientDTO, IHttpClient } from "./contracts";
import { AuthMiddleware } from "./middlewares/auth.middleware";

@injectable()
export class FetchHttpClient implements IHttpClient {
  constructor(
    @inject(AuthMiddleware) private readonly authMiddleware: AuthMiddleware
  ) {}

  private async thrower<T>(callback: () => Promise<HttpClientDTO.Output<T>>): Promise<HttpClientDTO.Output<T>> {
    try {
      return await callback();
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  }

  private async fetchRequest<T>(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<HttpClientDTO.Output<T>> {
    const response = await fetch(input, init);

    if (!response.ok) {
      throw new Error(`Fetch request failed: ${response.status}`);
    }
    return await response.json();
  }

  async get<T>({
    url,
    headers = {},
    params,
    addAuth = false,
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<HttpClientDTO.Output<T>> {
    const fullHeaders = this.authMiddleware.apply(headers, addAuth);
    const hasParams = params && Object.keys(params).length > 0;
    const queryParams = hasParams ? new URLSearchParams(params).toString() : "";
    const fullUrl = queryParams ? `${url}?${queryParams}` : url;
    const response = await this.fetchRequest<T>(fullUrl, { headers: fullHeaders, method: "GET" });

    return response;
  }

  async post<T>({
    url,
    data,
    headers = {},
    addAuth = false,
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<HttpClientDTO.Output<T>> {
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
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<HttpClientDTO.Output<T>> {
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
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<HttpClientDTO.Output<T>> {
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
  }: HttpClientDTO.Input & { addAuth?: boolean }): Promise<HttpClientDTO.Output<T>> {
    const fullHeaders = this.authMiddleware.apply(headers, addAuth);
    return await this.thrower(() =>
      this.fetchRequest<T>(url, { headers: fullHeaders, method: "DELETE" }),
    );
  }
}
