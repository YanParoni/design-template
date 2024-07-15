import "reflect-metadata";
import { Container } from "inversify";
import { GameInteractionGateway } from "@infra/gateways/game-interaction";
import TYPES from "@infra/http/types";
import { CreateInteractionDto } from "@infra/gateways/contracts/game-interaction";
import { fetchHttpClientMock } from "../utils/fetch-client.mock";

describe("GameInteractionGateway", () => {
  let container: Container;
  let gameInteractionGateway: GameInteractionGateway;

  beforeAll(() => {
    container = new Container();
    container.bind(TYPES.FetchHttpClient).toConstantValue(fetchHttpClientMock);
    container.bind(GameInteractionGateway).toSelf();
    gameInteractionGateway = container.get(GameInteractionGateway);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a game interaction", async () => {
    const interactionDto: CreateInteractionDto = {
      gameId: "game-id",
      liked: true,
      played: false,
    };
    fetchHttpClientMock.post.mockResolvedValue({
      data: { id: "interaction-id" },
      error: null,
    });

    const response =
      await gameInteractionGateway.createInteraction(interactionDto);

    expect(response).toEqual({ id: "interaction-id" });
    expect(fetchHttpClientMock.post).toHaveBeenCalledWith({
      url: "http://localhost:3000/game-interactions/game-id",
      data: {
        liked: true,
        played: false,
      },
      headers: {
        "Content-Type": "application/json",
      },
      addAuth: true,
    });
  });

  it("should fetch user interactions", async () => {
    fetchHttpClientMock.get.mockResolvedValue({
      data: [{ id: "interaction-id" }],
      error: null,
    });
    const interactions =
      await gameInteractionGateway.getUserInteractions("user-id");
    expect(interactions).toEqual([{ id: "interaction-id" }]);
    expect(fetchHttpClientMock.get).toHaveBeenCalledWith({
      url: "http://localhost:3000/game-interactions/user/user-id",
      headers: {
        "Content-Type": "application/json",
      },
      addAuth: true,
    });
  });
});
