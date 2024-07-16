import { HttpClientDTO } from "@infra/http/contracts";

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface ResetRequestDTO {
  email: string;
}

export interface IAuthGateway {
  login: (loginUserDto: LoginUserDto) => Promise<HttpClientDTO.Output<any>>;
  getProfile: () => Promise<HttpClientDTO.Output<any>>;
  requestReset: (email: ResetRequestDTO) => Promise<HttpClientDTO.Output<any>>;
  validateToken: (token: string) => Promise<HttpClientDTO.Output<any>>;
  resetPassword: (token: string, newPassword: string) => Promise<HttpClientDTO.Output<any>>;
  changePassword: (currentPassword: string | null, newPassword: string) => Promise<HttpClientDTO.Output<any>>;
}