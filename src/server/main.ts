import { NestFactory } from "@nestjs/core";
import {
  NestFastifyApplication,
  FastifyAdapter,
} from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

const port = parseInt(process.env.PORT || "3000", 10);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.listen(port);
}

bootstrap();
