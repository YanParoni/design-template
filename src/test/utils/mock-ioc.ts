import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "@infra/http/types";
import { AxiosHttpClient } from "@infra/http/axios";
import { AuthGateway } from "@infra/gateways/auth";

const mockContainer = new Container({ defaultScope: "Singleton" });

mockContainer.bind(TYPES.AxiosHttpClient).to(AxiosHttpClient);
mockContainer.bind(AuthGateway).toSelf();

export { mockContainer };
