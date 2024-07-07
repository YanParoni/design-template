import { inject, injectable } from "inversify";
import TYPES from "@infra/http/types";
import type { IHttpClient } from "../http/contracts";
import { CreateUserDTO, IUserGateway, UserDTO } from "./contracts/user";
import jwt from "jsonwebtoken";

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

  async getProfile(data: any): Promise<any> {
    const token = jwt.decode(data) as { sub: string };
    const url = `${BASE_URL}/users/profile/${token.sub}`;
    try {
      const response = await this.fetchHttpClient.get({
        url,
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${data}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error in AuthGateway login", error);
    }
  }

  async createUser(user: CreateUserDTO): Promise<UserDTO|null> {
    const url = `${BASE_URL}/users/register`;
    try {
      const response = await this.fetchHttpClient.post({
        url,
        headers: {
          Accept: "*/*",
        },
        data: user
      });
      return response.data;
    } catch (error) {
      console.error("Error in AuthGateway login", error);
      return null
    }
  }
}
