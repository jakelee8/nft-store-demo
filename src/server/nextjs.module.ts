import { Module } from "@nestjs/common";

import { NextjsController } from "./nextjs.controller";
import { NextjsService } from "./nextjs.service";

@Module({
  imports: [],
  controllers: [NextjsController],
  providers: [
    {
      provide: "NEXTJS_SERVICE",
      useFactory: NextjsService.create,
    },
  ],
})
export class NextjsModule {}
