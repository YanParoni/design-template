import IQueryParams from "./query"
import { StoreInfo } from "@entities/store"

export interface IStoreInfoGateway{
    getStores:(params?:IQueryParams) => Promise<StoreInfo>
}