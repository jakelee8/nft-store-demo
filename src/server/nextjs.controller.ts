import type { FastifyRequest, FastifyReply } from "fastify";
import { Controller, Get, Inject, Next, Req, Res } from "@nestjs/common";
import { parse } from "url";

import { NextjsService } from "./nextjs.service";

@Controller()
export class NextjsController {
  constructor(@Inject("NEXTJS_SERVICE") private server: NextjsService) {}

  @Get("*")
  getIndex(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Next() next: () => void
  ) {
    const parsedUrl = parse(req.url!, true);
    this.server.getHandler()(req.raw, res.raw, parsedUrl).then(next);
  }
}
