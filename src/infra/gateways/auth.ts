import { inject, injectable } from "inversify";
import TYPES from "@infra/http/types";
import type { IHttpClient } from "../http/contracts";
import { IAuthGateway, LoginUserDto, ResetRequestDTO } from "./contracts/auth";

const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP === "production"
    ? ""
    : "http://localhost:3000";
@injectable()
export class AuthGateway implements IAuthGateway {
  constructor(
    @inject(TYPES.FetchHttpClient)
    private readonly fetchHttpClient: IHttpClient,
  ) {}

  async getProfile(): Promise<any> {
    const url = `${BASE_URL}/auth/profile`;
    try {
      const response = await this.fetchHttpClient.get({
        url,
        headers: {
          "Content-Type": "application/json",
        },
        addAuth: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error in AuthGateway getProfile", error);
    }
  }

  async login(data: LoginUserDto): Promise<any> {
    const url = `${BASE_URL}/auth/login`;
    try {
      const response = await this.fetchHttpClient.post({
        url,
        data,
        headers: {
          "Content-Type": "application/json",
        },
        addAuth: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error logging in", error);
    }
  }

  async requestReset(email: ResetRequestDTO): Promise<any> {
    const url = `${BASE_URL}/auth/reset-password-request`;
    try {
      const response = await this.fetchHttpClient.post({
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data: email,
      });
      return response.data;
    } catch (error) {
      console.error("Error requesting password reset", error);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<any> {
    const url = `${BASE_URL}/auth/reset-password`;
    try {
      const response = await this.fetchHttpClient.post({
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data: { newPassword, token },
      });
      return response.data;
    } catch (error) {
      console.error("Error resetting password", error);
    }
  }

  async validateToken(token: string): Promise<any> {
    const url = `${BASE_URL}/auth/validate-token?token=${token}`;
    try {
      const response = await this.fetchHttpClient.get({
        url,
        addAuth: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error validating token", error);
    }
  }

  async changePassword(
    currentPassword: string | null,
    newPassword: string,
  ): Promise<any> {
    const url = `${BASE_URL}/auth/change-password`;
    try {
      const response = await this.fetchHttpClient.patch({
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data: { currentPassword, newPassword },
        addAuth: true,
      });
      return response;
    } catch (error) {
      console.error("Error in AuthGateway changePassword", error);
    }
  }
}
