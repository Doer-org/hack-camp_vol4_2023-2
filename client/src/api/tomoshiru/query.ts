import { graphqlClient } from "@/libs/graphql-client";
import * as schema from "@/utils/graphql";

export const getUserByToken = async () => {
  const data = await graphqlClient
    .query({
      query: schema.GetUserByTokenDocument,
    })
    .catch(() => null);
  return data?.data.getUserByToken || null;
};

export const getUsers = async () => {
  const data = await graphqlClient
    .query({
      query: schema.GetUsersDocument,
    })
    .catch(() => null);
  return data && data.data.getUsers;
};

export const getUser = async (user_id: string) => {
  const data = await graphqlClient
    .query({
      query: schema.GetUserDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.user || null;
};

export const getFollows = async (user_id: string) => {
  const data = await graphqlClient
    .query({
      query: schema.GetFollowsDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getFollows || null;
};

export const getFollowers = async (user_id: string) => {
  const data = await graphqlClient
    .query({
      query: schema.GetFollowersDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getFollowers || null;
};

export const getTimeLine = async (user_id: string) => {
  const data = await graphqlClient
    .query({
      query: schema.GetTimelineDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getTimeline || null;
};

export const getReaction = async (user_id: string) => {
  const data = await graphqlClient
    .query({
      query: schema.GetReactionDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getReaction || null;
};

export const getRamenProfile = async (user_id: string) => {
  const data = await graphqlClient
    .query({
      query: schema.GetRamenProfileDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getRamenProfile || null;
};
