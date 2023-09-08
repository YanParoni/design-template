import { NextResponse, NextRequest } from "next/server";
import { iocContainer } from "@ioc/index";
import { IChatGateway } from "@infra/gateways/contracts/chat";

export async function POST(REQUEST: NextRequest) {
  const res = await REQUEST.json()
  const chatProxy = iocContainer.get<IChatGateway>('ChatProxy');
  const games = await chatProxy.getCompletion(res);
  return NextResponse.json({ games })
}