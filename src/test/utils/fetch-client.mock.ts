import { IHttpClient } from "@infra/http/contracts";

export const fetchHttpClientMock: jest.Mocked<IHttpClient> = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  put: jest.fn(),
};
