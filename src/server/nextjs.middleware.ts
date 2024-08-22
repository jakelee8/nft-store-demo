import { Injectable, NestMiddleware } from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
import next from "next";
import { parse } from "url";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

@Injectable()
export class NextjsMiddleware implements NestMiddleware {
  use(req: FastifyRequest["raw"], res: FastifyReply["raw"], next: () => void) {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl).then(next);
  }
}
