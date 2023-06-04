import { env } from "@/utils/env";
import { ApolloClient, InMemoryCache } from "@apollo/client";
const { serverURL } = env();

type Args = {
  accessToken: string;
  sub: string;
  nickname: string;
  picture: string;
};

export const graphqlClient = (arg?: Args) =>
  new ApolloClient({
    uri: `${serverURL}/graphql`,
    headers: {
      Authorization: arg ? JSON.stringify(arg) : "",
    },
    cache: new InMemoryCache(),
    credentials: "include",
  });
