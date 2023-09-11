import { NextResponse,NextRequest } from "next/server";
import { iocContainer } from "@ioc/index";
import {IGamesGateway} from '@infra/gateways/contracts/games'

export async function GET(request, response) {
  const gamesProxy = iocContainer.get<IGamesGateway>('GamesProxy');
  const page = request.nextUrl.searchParams.get(['page'])
  const games = await gamesProxy.getGames(page);
  return NextResponse.json({games:games[0], next:games[1]})
}