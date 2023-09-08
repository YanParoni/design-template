import { NextResponse,NextRequest } from "next/server";
import { iocContainer } from "@ioc/index";
import {IGamesGateway} from '@infra/gateways/contracts/games'

export async function GET(req:NextRequest) {
    const url = new URL(req.url)
    const criteria = url.searchParams.get('search')
    if(!criteria) return
    const gamesProxy = iocContainer.get<IGamesGateway>('GamesProxy');
   const games = await gamesProxy.searchGame(criteria);
    return NextResponse.json({games})    
}