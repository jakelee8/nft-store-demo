"use client";

import { createApolloClient } from "@/lib/apollo-client-factory";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";
import React from "react";

export async function ApolloProvider({ children }: React.PropsWithChildren) {
  const client = await createApolloClient();

  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}
