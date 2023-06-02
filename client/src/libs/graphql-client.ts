import { env } from "@/utils/env";
import { ApolloClient, InMemoryCache } from "@apollo/client";
const { serverURL } = env();
export const graphqlClient = new ApolloClient({
  uri: `${serverURL}/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
});
