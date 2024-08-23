#!/usr/bin/env ./node_modules/.bin/ts-node

import { GraphQLDefinitionsFactory } from "@nestjs/graphql";
import { join } from "path";

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ["./src/**/*.graphql"],
  path: join(process.cwd(), "src/graphql.schema.ts"),
  outputAs: "class",
});
