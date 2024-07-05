import { useQuery } from "@tanstack/react-query";
import { iocContainer } from "@ioc/index";
import { IUserGateway } from "../../infra/gateways/contracts/user";

export async function getProfile(params: any) {
  const gateway = iocContainer.get<IUserGateway>("UserGateway");
  const response = await gateway.getProfile(params);
  return response;
}

export const useSearchGames = (name: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(name),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, refetch };
};
