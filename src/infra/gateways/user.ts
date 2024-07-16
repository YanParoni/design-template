import { inject, injectable } from "inversify";
import TYPES from "@infra/http/types";
import type { IHttpClient, HttpClientDTO } from "../http/contracts";
import { CreateUserDTO, IUserGateway, UserDTO } from "./contracts/user";

const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP === "production"
    ? process.env.NEXT_PUBLIC_API
    : "http://localhost:3000";

@injectable()
export class UserGateway implements IUserGateway {
  constructor(
    @inject(TYPES.AxiosHttpClient)
    private readonly fetchHttpClient: IHttpClient,
  ) {}

  async createUser(user: CreateUserDTO): Promise<HttpClientDTO.Output<UserDTO>> {
    const url = `${BASE_URL}/users/register`;
    return this.fetchHttpClient.post({
      url,
      headers: {
        Accept: "*/*",
      },
      data: user,
    });
  }

  async getProfile(): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/users/profile/`;
    return this.fetchHttpClient.get({
      url,
      headers: {
        Accept: "*/*",
      },
      addAuth: true,
    });
  }

  async changeAvatar(avatarUrl: string): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/users/profile-image`;
    return this.fetchHttpClient.patch({
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: { base64Image: avatarUrl },
      addAuth: true,
    });
  }

  async updateHeader(headerUrl: string): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/users/header-image`;
    return this.fetchHttpClient.patch({
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: { base64Image: headerUrl },
      addAuth: true,
    });
  }

  async updateBio(newBio: string): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/users/bio`;
    return this.fetchHttpClient.patch({
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: { newBio },
      addAuth: true,
    });
  }

  async updateAt(newAt: string): Promise<HttpClientDTO.Output<any>> {
    const url = `${BASE_URL}/users/at`;
    return this.fetchHttpClient.patch({
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: { newAt },
      addAuth: true,
    });
  }

  async updateUserDetails(details: {
    at?: string;
    bio?: string;
    header?: string;
    avatar?: string;
  }): Promise<HttpClientDTO.Output<any>> {
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
    return { data: true, error: null };
  }
}
