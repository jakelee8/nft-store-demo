import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { Test } from "@nestjs/testing";

import { AppModule } from "../src/server/app.module";

describe("AppController (e2e)", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /", () => {
    return app
      .inject({
        method: "GET",
        url: "/",
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
      });
  });

  it("POST /graphql", () => {
    return app
      .inject({
        method: "POST",
        url: "/graphql",
        body: {
          query: `{
            nfts(slug: "creatureworld") {
              items {
                id
                name
                description
                price
                imageUrl
                openSeaUrl
              }
              nextPageToken
            }
          }`,
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        const json = result.json();
        expect(json.data.nfts.items.length).toBeGreaterThan(0);
      });
  });
});
