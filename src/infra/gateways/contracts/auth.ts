export interface LoginUserDto {
  username: string;
  password: string;
}

export interface ResetRequestDTO {
  email:string
}

export interface IAuthGateway {
  login: (loginUserDto: LoginUserDto) => Promise<any>;
  getProfile: (id: string) => Promise<any>;
  requestReset: (email: ResetRequestDTO) => Promise<any>;
  validateToken: (token: string) => Promise<any>;
  resetPassword: (token: string, newPassword: string) => Promise<any>;
}

