import { inject, injectable } from "inversify";
import TYPES from "@infra/http/types";
import type { IHttpClient, HttpClientDTO } from "../http/contracts";
import { IAuthGateway, LoginUserDto, ResetRequestDTO } from "./contracts/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP === "production"
    ? process.env.NEXT_PUBLIC_API
    : "http://localhost:3000";

@injectable()
export class AuthGateway implements IAuthGateway {
  constructor(
    @inject(TYPES.AxiosHttpClient)
    private readonly fetchHttpClient: IHttpClient,
  ) {}

  async getProfile(): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/auth/profile`;
    return this.fetchHttpClient.get({
      url,
      headers: {
        "Content-Type": "application/json",
      },
      addAuth: true,
    });
  }

  async login(data: LoginUserDto): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/auth/login`;
    return this.fetchHttpClient.post({
      url,
      data,
      headers: {
        "Content-Type": "application/json",
      },
      addAuth: true,
    });
  }

  async requestReset(email: ResetRequestDTO): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/auth/reset-password-request`;
    return this.fetchHttpClient.post({
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: email,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/auth/reset-password`;
    return this.fetchHttpClient.post({
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: { newPassword, token },
    });
  }

  async validateToken(token: string): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/auth/validate-token?token=${token}`;
    return this.fetchHttpClient.get({
      url,
      addAuth: true,
    });
  }

  async changePassword(
    currentPassword: string | null,
    newPassword: string,
  ): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/auth/change-password`;
    return this.fetchHttpClient.patch({
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: { currentPassword, newPassword },
      addAuth: true,
    });
  }
}
