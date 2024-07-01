export interface CreateInteractionDto {
  gameId: string;
  liked: boolean;
  played: boolean;
}

export interface IGameInteractionGateway {
  createInteraction: (createInteractionDto: CreateInteractionDto) => Promise<any>;
  getUserInteractions: (userId: string) => Promise<any>;
}
