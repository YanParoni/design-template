import { inject, injectable } from "inversify";
import TYPES from "@infra/http/types";
import type { IHttpClient } from "../http/contracts";
import { IChatGateway } from "./contracts/chat";

const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP === "production"
    ? "https://design-template-ivory.vercel.app/api/proxy"
    : "http://localhost:3001/api/proxy";

@injectable()
export class ChatGateway implements IChatGateway {
  constructor(
    @inject(TYPES.FetchHttpClient)
    private readonly fetchHttpClient: IHttpClient,
  ) {}

  async getCompletion(params: string): Promise<any> {
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant.Your only role is to help the user find the right game they want, you know only about videogames, if a user asks about games from a specific country, developer or style do your best to answer it, anything else  that its  asked you should be gracefully dismissed, please highlight every name of game you suggest like this <Call of duty> and always recomend at least 1 game maximum of three, be as brief as possible.",
        },
        {
          role: "user",
          content: params,
        },
      ],
    };
    const url = `${BASE_URL}/chat`;
    const response = await this.fetchHttpClient.post({ url, data });
    return response;
  }
}
