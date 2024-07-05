export interface IChatGateway {
  getCompletion: (...params: any) => Promise<any>;
}
