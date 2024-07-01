import { useQuery, useMutation } from "@tanstack/react-query";
import { iocContainer } from "@ioc/index";
import { IGameInteractionGateway, CreateInteractionDto } from "@infra/gateways/contracts/game-interaction";

async function createInteraction(data: CreateInteractionDto) {
  const gateway = iocContainer.get<IGameInteractionGateway>('GameInteractionGateway');
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
    isPending
  };
};

async function getUserInteractions(userId: string) {
  const gateway = iocContainer.get<IGameInteractionGateway>('GameInteractionGateway');
  const response = await gateway.getUserInteractions(userId);
  return response;
}

export const useGetUserInteractions = (userId: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['getUserInteractions', userId],
    queryFn: () => getUserInteractions(userId),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, refetch };
};
