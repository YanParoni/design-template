import { useQuery } from "@tanstack/react-query";
import { IGamesGateway } from "../../infra/gateways/contracts/games";
import IQueryParams from "@infra/gateways/contracts/query";
import { useSearchParams } from 'next/navigation';
import { useFilterStore } from "client/store";

import { iocContainer } from "@ioc/index";
import { useGameStore } from "client/store";

export async function getGames(params: IQueryParams) {
    const gateway = iocContainer.get<IGamesGateway>('GamesGateway');
    const response = await gateway.searchGame(params)
    useGameStore.getState().setGames(response.games)
    return response.games
}

export const useSearchGames = (name?:string) => {
    const searchParams = useSearchParams()
    const filter = useFilterStore()
    const { genres, platforms, rating,search } = filter;
    const page = searchParams.get('page') ?? '1'
    const { data,isLoading,refetch } = useQuery({
        queryKey: ["getGames", page],
        queryFn: () => {
            const genresString = genres.join(',');
            const platformsString = platforms.join(',');
            const ratingString = `${rating.min},${rating.max}`;
            const obj:IQueryParams = {
                metacritic: ratingString,
                parent_platforms: platformsString,
                genres: genresString,
                page: page,
                search:search
            };
            if(name){obj.search = name}
            const filteredObj = Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== ''));
            return getGames(filteredObj)
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
    return { data,isLoading,refetch }
};

export const useSearchChatGames = (args:IQueryParams) =>{
    const { data,isLoading,isSuccess } = useQuery({
        queryKey: ["chatGames",args.search],
        queryFn: () => {
            return getGames(args)
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
    return { data,isLoading,isSuccess }
}