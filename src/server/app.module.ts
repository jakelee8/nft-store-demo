import { Module } from "@nestjs/common";
import next from "next";

import { AppController } from "./app.controller";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: "NEXTJS_HANDLER",
      useFactory: async () => {
        const dev = process.env.NODE_ENV === "development";
        const app = next({ dev });
        await app.prepare();
        return app.getRequestHandler();
      },
    },
  ],
})
export class AppModule {}
