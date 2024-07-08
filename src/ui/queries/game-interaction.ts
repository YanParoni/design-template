import { useQuery, useMutation } from "@tanstack/react-query";
import { iocContainer } from "@ioc/index";
import {
  IGameInteractionGateway,
  CreateInteractionDto,
} from "@infra/gateways/contracts/game-interaction";
import { useAuthStore, useGameInteractionsStore } from "client/store";

async function createInteraction(data: CreateInteractionDto) {
  const gateway = iocContainer.get<IGameInteractionGateway>(
    "GameInteractionGateway",
  );
  const response = await gateway.createInteraction(data);
  return response;
}

export const useCreateInteraction = () => {
  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: createInteraction,
  });

  return {
    createInteraction: mutateAsync,
    data,
    isPending,
  };
};

export async function getUserInteractions(userId: string) {
  const gateway = iocContainer.get<IGameInteractionGateway>(
    "GameInteractionGateway",
  );
  const response = await gateway.getUserInteractions(userId);
  return response;
}

export const useGameInteractions = () => {
  const { user } = useAuthStore();
  const { setGameInteractions } = useGameInteractionsStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getUserInteractions", user?.sub],
    queryFn: async () => {
      if (!user) return null;
      const response = await getUserInteractions(user.sub);
      setGameInteractions(response);
      return response;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!user,
  });

  return { data, isLoading, refetch };
};