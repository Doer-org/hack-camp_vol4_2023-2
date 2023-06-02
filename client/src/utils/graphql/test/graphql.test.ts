import { ApolloClient, InMemoryCache } from "@apollo/client";
import { expect, test } from "vitest";
import * as schema from "../generated/graphql";

const IS_TEST_ENV = false; // serverがTest環境かどうか

const graphqlClient = new ApolloClient({
  uri: `http://localhost:8080/graphql`, // TODO: vitestで環境変数読み込み
  cache: new InMemoryCache(),
});

test("GetUsersDocument", async () => {
  const result = await graphqlClient
    .query({
      query: schema.GetUsersDocument,
    })
    .catch(() => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(true);
});

test("GetUserDocument", async () => {
  const result = await graphqlClient
    .query({
      query: schema.GetUserDocument,
      variables: { user_id: "abc" },
    })
    .catch((e) => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(true);
});

test("getFollows", async () => {
  const result = await graphqlClient
    .query({
      query: schema.GetFollowsDocument,
      variables: { user_id: "abc" },
    })
    .catch(() => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(true);
});

test("getFollowers", async () => {
  const result = await graphqlClient
    .query({
      query: schema.GetFollowersDocument,
      variables: { user_id: "abc" },
    })
    .catch(() => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(true);
});

test("getTimeLine", async () => {
  const result = await graphqlClient
    .query({
      query: schema.GetTimelineDocument,
      variables: { user_id: "abc" },
    })
    .catch(() => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(IS_TEST_ENV);
});

test("getReaction", async () => {
  const result = await graphqlClient
    .query({
      query: schema.GetReactionDocument,
      variables: { user_id: "abc" },
    })
    .catch(() => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(true);
});

test("getRamenProfile", async () => {
  const result = await graphqlClient
    .query({
      query: schema.GetRamenProfileDocument,
      variables: { user_id: "abc" },
    })
    .catch(() => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(true);
});

test("createUser", async () => {
  const result = await graphqlClient
    .mutate({
      mutation: schema.CreateUserDocument,
    })
    .catch(() => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(IS_TEST_ENV);
});

test("updateReaction", async () => {
  const result = await graphqlClient
    .mutate({
      mutation: schema.UpdateReactionDocument,
      variables: { user_id_from: "abc", user_id_to: "cdf", kind: "like" },
    })
    .catch(() => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(IS_TEST_ENV);
});

test("updateRamenProfile", async () => {
  const result = await graphqlClient
    .mutate({
      mutation: schema.UpdateRamenProfileDocument,
      variables: { user_id: "abc", ramenya: "test", rank: 1 },
    })
    .catch(() => {
      return null;
    });
  const success = result ? true : false;
  expect(success).toBe(IS_TEST_ENV);
});
