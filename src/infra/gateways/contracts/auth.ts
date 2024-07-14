export interface LoginUserDto {
  email: string;
  password: string;
}

export interface ResetRequestDTO {
  email: string;
}

export interface IAuthGateway {
  login: (loginUserDto: LoginUserDto) => Promise<any>;
  getProfile: () => Promise<any>;
  requestReset: (email: ResetRequestDTO) => Promise<any>;
  validateToken: (token: string) => Promise<any>;
  resetPassword: (token:string, newPassword: string) => Promise<any>;
  changePassword: (
    currentPassword: string | null,
    newPassword: string,
  ) => Promise<any>;
}
