export interface IAuthMiddleware {
  apply(headers: Record<string, string>, addAuth: boolean): Record<string, string>;
}