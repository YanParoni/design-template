import { injectable } from "inversify";
import { IAuthMiddleware } from "@infra/gateways/contracts/auth-middleware";

@injectable()
export class AuthMiddleware implements IAuthMiddleware {
  private getToken(): string | null {
    return localStorage.getItem("token");
  }

  public apply(headers: Record<string, string>, addAuth: boolean): Record<string, string> {
    if (addAuth) {
      const token = this.getToken();
      if (token) {
        return {
          ...headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }
    return headers;
  }
}
