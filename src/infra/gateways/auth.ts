import { inject, injectable } from 'inversify';
import TYPES from '@infra/http/types';
import type { IHttpClient } from '../http/contracts';
import { IAuthGateway, LoginUserDto } from './contracts/auth';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP === 'production' ? '' : 'http://localhost:3000';

@injectable()
export class AuthGateway implements IAuthGateway {
  constructor(
    @inject(TYPES.AxiosHttpClient) private readonly fetchHttpClient: IHttpClient
  ) {}

  async login(data: LoginUserDto): Promise<any> {
    const url = `${BASE_URL}/auth/login`;
    try {
      const response = await this.fetchHttpClient.post({
        url,
        data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Error in AuthGateway login', error);
    }
  }

  async getProfile(id: string): Promise<any> {
    const url = `${BASE_URL}/users/profile/${id}`;
    try {
      const response = await this.fetchHttpClient.get({
        url,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Error in AuthGateway getProfile', error);
    }
  }
}
