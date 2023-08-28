import { NextResponse , NextRequest} from "next/server";
import { iocContainer } from "@ioc/index";
import {IGamesGateway} from '@infra/gateways/contracts/games'

export async function GET(req: Request, ) {
  const gamesProxy = iocContainer.get<IGamesGateway>('GamesProxy');
  const games = await gamesProxy.getGames();
 
  return NextResponse.json({games})
}