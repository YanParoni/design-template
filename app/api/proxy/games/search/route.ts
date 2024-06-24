import { NextResponse, NextRequest } from "next/server";
import { iocContainer } from "@ioc/index";
import { IGamesGateway } from '@infra/gateways/contracts/games'
import { GameResponse } from "client/store/types";

export async function PUT(req: NextRequest) {
    const parsedReq = await req.json();
    const games: GameResponse = { count: 0, results: [] }
    if (!parsedReq) return;
    const gamesProxy = iocContainer.get<IGamesGateway>('GamesProxy');
    console.log(parsedReq,'parsed')
    const obj = await gamesProxy.searchGame(parsedReq);
    games.count = obj.count;
    games.results = obj.results;
    return NextResponse.json({ games });
}
