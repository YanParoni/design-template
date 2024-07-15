import "reflect-metadata";
import { Container } from "inversify";
import { AuthGateway } from "@infra/gateways/auth";
import TYPES from "@infra/http/types";
import { LoginUserDto, ResetRequestDTO } from "@infra/gateways/contracts/auth";
import { fetchHttpClientMock } from "../utils/fetch-client.mock";

describe("AuthGateway", () => {
  let container: Container;
  let authGateway: AuthGateway;

  beforeAll(() => {
    container = new Container();
    container.bind(TYPES.FetchHttpClient).toConstantValue(fetchHttpClientMock);
    container.bind(AuthGateway).toSelf();
    authGateway = container.get(AuthGateway);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch user profile", async () => {
    fetchHttpClientMock.get.mockResolvedValue({
      data: { id: "user-id" },
      error: null,
    });
    const profile = await authGateway.getProfile();
    expect(profile).toEqual({ id: "user-id" });
    expect(fetchHttpClientMock.get).toHaveBeenCalledWith({
      url: "http://localhost:3000/auth/profile",
      headers: {
        "Content-Type": "application/json",
      },
      addAuth: true,
    });
  });

  it("should login a user", async () => {
    const loginUserDto: LoginUserDto = {
      email: "test@example.com",
      password: "password",
    };
    fetchHttpClientMock.post.mockResolvedValue({
      data: { token: "token" },
      error: null,
    });

    const response = await authGateway.login(loginUserDto);

    expect(response).toEqual({ token: "token" });
    expect(fetchHttpClientMock.post).toHaveBeenCalledWith({
      url: "http://localhost:3000/auth/login",
      data: loginUserDto,
      headers: {
        "Content-Type": "application/json",
      },
      addAuth: true,
    });
  });

  it("should request password reset", async () => {
    const resetRequestDto: ResetRequestDTO = { email: "test@example.com" };
    fetchHttpClientMock.post.mockResolvedValue({
      data: { success: true },
      error: null,
    });

    const response = await authGateway.requestReset(resetRequestDto);

    expect(response).toEqual({ success: true });
    expect(fetchHttpClientMock.post).toHaveBeenCalledWith({
      url: "http://localhost:3000/auth/reset-password-request",
      data: resetRequestDto,
      addAuth: true,
    });
  });

  it("should reset password", async () => {
    fetchHttpClientMock.post.mockResolvedValue({
      data: { success: true },
      error: null,
    });

    const response = await authGateway.resetPassword("newPassword");

    expect(response).toEqual({ success: true });
    expect(fetchHttpClientMock.post).toHaveBeenCalledWith({
      url: "http://localhost:3000/auth/reset-password",
      data: { newPassword: "newPassword" },
      addAuth: true,
    });
  });

  it("should validate token", async () => {
    fetchHttpClientMock.get.mockResolvedValue({
      data: { valid: true },
      error: null,
    });

    const response = await authGateway.validateToken("token");

    expect(response).toEqual({ valid: true });
    expect(fetchHttpClientMock.get).toHaveBeenCalledWith({
      url: "http://localhost:3000/auth/validate-token?token=token",
      addAuth: true,
    });
  });

  it("should change password", async () => {
    fetchHttpClientMock.patch.mockResolvedValue({
      data: { success: true },
      error: null,
    });

    const response = await authGateway.changePassword(
      "currentPassword",
      "newPassword",
    );

    expect(response).toEqual({ data: { success: true }, error: null });
    expect(fetchHttpClientMock.patch).toHaveBeenCalledWith({
      url: "http://localhost:3000/auth/change-password",
      headers: {
        "Content-Type": "application/json",
      },
      data: { currentPassword: "currentPassword", newPassword: "newPassword" },
      addAuth: true,
    });
  });
});
