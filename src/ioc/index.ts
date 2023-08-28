import 'reflect-metadata'
import { Container } from 'inversify'
import { StoreInfoProxy } from '@app/api/proxy/stores/proxy'
import { GamesProxy } from '@app/api/proxy/games/proxy'
import { IHttpClient } from '@infra/http/contracts'
import { AxiosHttpClient } from '@infra/http/axios'
import { IGamesGateway } from '@infra/gateways/contracts/games'
import { GamesGateway } from '@infra/gateways/games'
import { IStoreInfoGateway } from '@infra/gateways/contracts/store'
import { StoreInfoGateway } from '@infra/gateways/store'

const iocContainer = new Container({ defaultScope: 'Singleton' })

iocContainer.bind<IHttpClient>('HttpClient').to(AxiosHttpClient)
iocContainer.bind<IGamesGateway>('GamesGateway').to(GamesGateway)
iocContainer.bind<IGamesGateway>('GamesProxy').to(GamesProxy)
iocContainer.bind<IStoreInfoGateway>('StoreInfoGateway').to(StoreInfoGateway)
iocContainer.bind<IStoreInfoGateway>('StoreInfoProxy').to(StoreInfoProxy)

export { iocContainer }


