import 'reflect-metadata'
import { Container } from 'inversify'
import TYPES from '@infra/http/types'
import { StoreInfoProxy } from '@app/api/proxy/stores/proxy'
import { GamesProxy } from '@app/api/proxy/games/proxy'
import { IHttpClient } from '@infra/http/contracts'
import { FetchHttpClient } from '@infra/http/fetch'
import { AxiosHttpClient } from '@infra/http/axios'
import { IGamesGateway } from '@infra/gateways/contracts/games'
import { GamesGateway } from '@infra/gateways/games'
import { IStoreInfoGateway } from '@infra/gateways/contracts/store'
import { StoreInfoGateway } from '@infra/gateways/store'
import { IChatGateway } from '@infra/gateways/contracts/chat'
import { ChatGateway } from '@infra/gateways/chat'
import { ChatProxy } from '@app/api/proxy/chat/proxy'

const iocContainer = new Container({ defaultScope: 'Singleton' })

iocContainer.bind<IHttpClient>(TYPES.AxiosHttpClient).to(AxiosHttpClient);
iocContainer.bind<IHttpClient>(TYPES.FetchHttpClient).to(FetchHttpClient);
iocContainer.bind<IGamesGateway>('GamesGateway').to(GamesGateway);
iocContainer.bind<IGamesGateway>('GamesProxy').to(GamesProxy)
iocContainer.bind<IChatGateway>('ChatGateway').to(ChatGateway)
iocContainer.bind<IChatGateway>('ChatProxy').to(ChatProxy)
iocContainer.bind<IStoreInfoGateway>('StoreInfoGateway').to(StoreInfoGateway)
iocContainer.bind<IStoreInfoGateway>('StoreInfoProxy').to(StoreInfoProxy)

export { iocContainer }
