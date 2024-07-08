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

  async login(data: LoginUserDto): Promise<any> {
    const url = `${BASE_URL}/auth/login`;
    try {
      const response = await this.fetchHttpClient.post({
        url,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error in AuthGateway login", error);
      return error 
    }
  }

  async getProfile(data: string): Promise<any> {
    const url = `${BASE_URL}/auth/profile`;
    try {
      const response = await this.fetchHttpClient.get({
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error in AuthGateway getProfile", error);
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
      return response;
    } catch (error) {
      console.error("Error in AuthGateway requestReset", error);
    }
  }

  async validateToken(token: string): Promise<any> {
    const url = `${BASE_URL}/auth/validate-token?token=${token}`;
    try {
      const response = await this.fetchHttpClient.get({
        url,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Error in AuthGateway validateToken", error);
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
        data: { token, newPassword },
      });
      return response;
    } catch (error) {
      console.error("Error in AuthGateway resetPassword", error);
    }
  }
}
