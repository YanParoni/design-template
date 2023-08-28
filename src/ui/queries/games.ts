import { useQuery } from "@tanstack/react-query";
import { useDeps } from "../hooks/use-deps";
import IQueryParams from "../../infra/gateways/contracts/query";
import { IGamesGateway } from "../../infra/gateways/contracts/games";

export const useGetGames = (params?: IQueryParams) => {
    const gamesGateway = useDeps<IGamesGateway>('GamesGateway');

    const { data, isLoading, isError, error, refetch, isSuccess } = useQuery({
        staleTime: 1000 * 60 * 5, 
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        queryKey: ['getGames', params],
        queryFn: async () => {
            return await gamesGateway.getGames(params);
        },
    });
    return {
        data,
        isLoading,
        isError,
        error,
        isSuccess,
        refetch,
    };
};