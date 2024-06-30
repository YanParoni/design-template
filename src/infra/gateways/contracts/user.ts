export interface IUserGateway {
  getProfile: (id:string ) => Promise<any>;
}