import { NextResponse, NextRequest } from "next/server";
import { iocContainer } from "@ioc/index";
import { IGamesGateway } from "@infra/gateways/contracts/games";
import { GameResponse } from "client/store/types";

export async function PUT(req: NextRequest) {
  const parsedReq = await req.json();
  if (!parsedReq) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const games: GameResponse = {
    count: 0,
    results: [],
    next: null,
    previous: null,
  };

  const gamesProxy = iocContainer.get<IGamesGateway>("GamesProxy");
  const obj = await gamesProxy.searchGame(parsedReq);
  games.count = obj?.count || 0;
  games.results = obj?.results || [];
  games.next = obj?.next || null;
  games.previous = obj?.previous || null;

  return NextResponse.json({ data: games });
}
