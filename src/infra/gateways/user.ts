import { inject, injectable } from "inversify";
import TYPES from "@infra/http/types";
import type { IHttpClient } from "../http/contracts";
import { CreateUserDTO, IUserGateway, UserDTO } from "./contracts/user";

const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP === "production"
    ? ""
    : "http://localhost:3000";

@injectable()
export class UserGateway implements IUserGateway {
  constructor(
    @inject(TYPES.AxiosHttpClient)
    private readonly fetchHttpClient: IHttpClient,
  ) {}

  async getProfile(): Promise<any> {
    const url = `${BASE_URL}/users/profile/`;
    try {
      const response = await this.fetchHttpClient.get({
        url,
        headers: {
          Accept: "*/*",
        },
        addAuth: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error in UserGateway getProfile", error);
    }
  }

  async changeAvatar(avatarUrl: string): Promise<any> {
    const url = `${BASE_URL}/users/profile-image`;
    try {
      const response = await this.fetchHttpClient.patch({
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data: { base64Image: avatarUrl },
        addAuth: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error in UserGateway changeAvatar", error);
    }
  }

  async updateHeader(headerUrl: string): Promise<any> {
    const url = `${BASE_URL}/users/header-image`;
    try {
      const response = await this.fetchHttpClient.patch({
        url,
        headers: {
          "Content-Type": "application/json",
          addAuth: true,
        },
        data: { base64Image: headerUrl },
      });
      return response.data;
    } catch (error) {
      console.error("Error in UserGateway updateHeader", error);
    }
  }

  async updateBio(newBio: string): Promise<any> {
    const url = `${BASE_URL}/users/bio`;
    try {
      const response = await this.fetchHttpClient.patch({
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data: { newBio },
        addAuth: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error in UserGateway updateBio", error);
    }
  }

  async updateAt(newAt: string): Promise<any> {
    const url = `${BASE_URL}/users/at`;
    try {
      const response = await this.fetchHttpClient.patch({
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data: { newAt },
        addAuth: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error in UserGateway updateAt", error);
    }
  }

  async createUser(user: CreateUserDTO): Promise<UserDTO | null> {
    const url = `${BASE_URL}/users/register`;
    try {
      const response = await this.fetchHttpClient.post({
        url,
        headers: {
          Accept: "*/*",
        },
        data: user,
      });
      return response.data;
    } catch (error) {
      console.error("Error in UserGateway createUser", error);
      return null;
    }
  }

  async updateUserDetails(details: {
    at?: string;
    bio?: string;
    header?: string;
    avatar?: string;
  }): Promise<any> {
    if (details.avatar) {
      await this.changeAvatar(details.avatar);
    }
    if (details.header) {
      await this.updateHeader(details.header);
    }
    if (details.bio) {
      await this.updateBio(details.bio);
    }
    if (details.at) {
      await this.updateAt(details.at);
    }
    return true;
  }
}
