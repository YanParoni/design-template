export interface LoginUserDto {
  email: string;
  password: string;
}

export interface ResetRequestDTO {
  email:string
}

export interface IAuthGateway {
  login: (loginUserDto: LoginUserDto) => Promise<any>;
  getProfile: (id: string) => Promise<any>;
  requestReset:(email: ResetRequestDTO) => Promise<any>;
}
