import { join } from "path";

import { Module } from "@nestjs/common";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";

import { NextjsModule } from "./nextjs.module";
import { NftsModule } from "./nfts/nfts.module";

@Module({
  imports: [
    NextjsModule,
    NftsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src/graphql.schema.ts"),
        outputAs: "class",
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
