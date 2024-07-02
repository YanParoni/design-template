// src/infra/gateways/game-interaction.ts
import { inject, injectable } from 'inversify';
import TYPES from '@infra/http/types';
import type { IHttpClient } from '../http/contracts';
import { CreateInteractionDto, IGameInteractionGateway } from './contracts/game-interaction';

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP === 'production' ? '' : 'http://localhost:3000';

@injectable()
export class GameInteractionGateway implements IGameInteractionGateway {
  constructor(
    @inject(TYPES.AxiosHttpClient) private readonly httpClient: IHttpClient
  ) {}

  async createInteraction(createInteractionDto: CreateInteractionDto): Promise<any> {
    const url = `${BASE_URL}/game-interactions/${createInteractionDto.gameId}`;
    try {
      const response = await this.httpClient.post({
        url,
        data: {
          liked: createInteractionDto.liked,
          played: createInteractionDto.played,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Error in GameInteractionGateway createInteraction', error);
    }
  }

  async getUserInteractions(userId: string): Promise<any> {
    const url = `${BASE_URL}/game-interactions/user/${userId}`;
    try {
      const response = await this.httpClient.get({
        url,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Error in GameInteractionGateway getUserInteractions', error);
    }
  }
}
