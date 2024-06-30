export interface LoginUserDto{
email: string
password: string
}
export interface IAuthGateway {
 login:(loginUserDto: LoginUserDto) =>Promise<any>
}
