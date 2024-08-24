import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export async function createApolloClient() {
  // @apollo/client cannot be imported directly
  const { HttpLink } = await import("@apollo/client");

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "http://localhost:3000/graphql",
    }),
  });
}
