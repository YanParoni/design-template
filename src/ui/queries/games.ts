import { useQuery } from "@tanstack/react-query";
import { useDeps } from "../hooks/use-deps";
import { IGamesGateway } from "../../infra/gateways/contracts/games";

export const useGetGames = () => {
    const gamesGateway = useDeps<IGamesGateway>('GamesGateway');

    const { data, isLoading, isError, error, refetch, isSuccess } = useQuery({
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        suspense:true,
        queryKey: ['getGames'],
        queryFn: async () => {
            return await gamesGateway.getGames();
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

export const useSearchGames = (name: string) => {
    const gamesGateway = useDeps<IGamesGateway>('GamesGateway');
    const { data, isLoading, isError, error, refetch, isSuccess } = useQuery({
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        suspense:true,
        
        queryKey: ['searchGame',name],
        queryFn: async () => {
            return await gamesGateway.searchGame(name);
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