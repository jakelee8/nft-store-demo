import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";

import { createApolloClient } from "./apollo-client-factory";

export const { getClient, query, PreloadQuery } =
  registerApolloClient(createApolloClient);
