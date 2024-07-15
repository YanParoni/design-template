import { useQuery } from "@tanstack/react-query";
import { iocContainer } from "@ioc/index";
import { IGamesGateway } from "../../infra/gateways/contracts/games";
import IQueryParams from "@infra/gateways/contracts/query";
import { useFilterStore, usePaginationStore } from "client/store";
import { useGameStore } from "client/store";

export async function getGames(params: IQueryParams) {
  const gateway = iocContainer.get<IGamesGateway>("GamesGateway");
  const response = await gateway.searchGame(params);
  useGameStore.getState().setGames(response.data);
  return response
}

export const useSearchGames = (name?: string) => {
  const filter = useFilterStore();
  const pagination = usePaginationStore();
  const { genre, platform, store, search } = filter;
  const { currentPage, pageSize } = pagination;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "getGames",
      currentPage,
      pageSize,
      genre,
      platform,
      store,
      search,
    ],
    queryFn: () => {
      const obj: IQueryParams = {
        parent_platforms: platform ? platform.toString() : "",
        genres: genre || "",
        stores: store ? store.toString() : "",
        page: currentPage.toString(),
        search: search,
        page_size: pageSize,
      };
      if (name) {
        obj.search = name;
      }
      const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(
          ([_, v]) => v !== null && v !== undefined && v !== "",
        ),
      );
      return getGames(filteredObj);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: true,
  });
  return { data, isLoading, refetch };
};

export const useSearchChatGames = (args: IQueryParams) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["chatGames", args.search],
    queryFn: () => {
      return getGames(args);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, isLoading, isSuccess };
};
