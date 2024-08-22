import type { FastifyRequest, FastifyReply } from "fastify";
import { Controller, Get, Inject, Next, Req, Res } from "@nestjs/common";
import type { RequestHandler } from "next/dist/server/next";
import { parse } from "url";

@Controller()
export class AppController {
  constructor(@Inject("NEXTJS_HANDLER") private handler: RequestHandler) {}

  @Get("*")
  getIndex(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Next() next: () => void
  ) {
    const parsedUrl = parse(req.url!, true);
    this.handler(req.raw, res.raw, parsedUrl).then(next);
  }
}
