import { NextResponse} from "next/server";
import { iocContainer } from "@ioc/index";
import { IStoreInfoGateway } from "@infra/gateways/contracts/store";

export async function GET() {
  const gamesProxy = iocContainer.get<IStoreInfoGateway>('StoreInfoProxy');
  const games = await gamesProxy.getStores();
  return NextResponse.json({ games })
}