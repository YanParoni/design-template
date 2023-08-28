import { useQuery } from "@tanstack/react-query";
import { useDeps } from "../hooks/use-deps";
import IQueryParams from "../../infra/gateways/contracts/query";
import { IStoreInfoGateway } from "../../infra/gateways/contracts/store";

export const useGetStores = (params?: IQueryParams) => {
    const storesGateway = useDeps<IStoreInfoGateway>('StoreInfoGateway');

    const { data, isLoading, isError, error, refetch, isSuccess } = useQuery({
        suspense: true,
        staleTime: 1000 * 60 * 5, 
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        queryKey: ['getStores', params],
        queryFn: async () => {
            return await storesGateway.getStores(params);
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