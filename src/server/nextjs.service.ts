import {
  Inject,
  Injectable,
  Module,
  OnApplicationShutdown,
} from "@nestjs/common";
import next from "next";
import { NextServer, type RequestHandler } from "next/dist/server/next";

@Injectable()
export class NextjsService implements OnApplicationShutdown {
  constructor(private server: NextServer) {}

  static async create(): Promise<NextjsService> {
    const dev = process.env.NODE_ENV === "development";
    const server = next({ dev });
    await server.prepare();
    return new NextjsService(server);
  }

  getHandler(): RequestHandler {
    return this.server.getRequestHandler();
  }

  async onApplicationShutdown() {
    await this.server.close();
  }
}
