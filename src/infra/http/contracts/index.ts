export interface IHttpClient {
  get: (input: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>;
  post: (input: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>;
  put: (input: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>;
  patch: (input: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>;
  delete: (input: HttpClientDTO.Input) => Promise<HttpClientDTO.Output>;
}

export namespace HttpClientDTO {
  export type Input = {
    url: string;
    data?: any;
    headers?: any;
    params?: any;
  };

  export type Output = any;
}
