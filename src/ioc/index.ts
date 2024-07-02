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
import { AuthGateway } from '@infra/gateways/auth'
import { IAuthGateway } from '@infra/gateways/contracts/auth'
import { IUserGateway } from '@infra/gateways/contracts/user'
import { UserGateway } from '@infra/gateways/user'
import { GameInteractionGateway } from '@infra/gateways/game-interaction'
import {  IGameInteractionGateway} from '@infra/gateways/contracts/game-interaction'

const iocContainer = new Container({ defaultScope: 'Singleton' })

iocContainer.bind<IHttpClient>(TYPES.AxiosHttpClient).to(AxiosHttpClient);
iocContainer.bind<IHttpClient>(TYPES.FetchHttpClient).to(FetchHttpClient);
iocContainer.bind<IGamesGateway>('GamesGateway').to(GamesGateway);
iocContainer.bind<IGamesGateway>('GamesProxy').to(GamesProxy)
iocContainer.bind<IChatGateway>('ChatGateway').to(ChatGateway)
iocContainer.bind<IChatGateway>('ChatProxy').to(ChatProxy)
iocContainer.bind<IStoreInfoGateway>('StoreInfoGateway').to(StoreInfoGateway)
iocContainer.bind<IStoreInfoGateway>('StoreInfoProxy').to(StoreInfoProxy)
iocContainer.bind<IAuthGateway>('AuthGateway').to(AuthGateway)
iocContainer.bind<IUserGateway>('UserGateway').to(UserGateway)
iocContainer.bind<IGameInteractionGateway>('GameInteractionGateway').to(GameInteractionGateway)


export { iocContainer }
