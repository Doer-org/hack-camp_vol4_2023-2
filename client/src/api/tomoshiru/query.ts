import { graphqlClient } from "@/libs/graphql-client";
import * as schema from "@/utils/graphql";
import { fetchAuthInfo } from "../auth";

const client = async () => {
  const me = await fetchAuthInfo();
  return graphqlClient({
    accessToken: me.token,
    sub: me.me.sub,
    nickname: me.me.nickname,
    picture: me.me.picture,
  });
};

export const getUserByToken = async () => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetUserByTokenDocument,
    })
    .catch(() => null);
  return data?.data.userByToken || null;
};

export const getUsers = async () => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetAllUsersDocument,
    })
    .catch(() => null);
  return data && data.data.allUsers;
};

export const getUser = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetUserDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.user.data || null;
};

export const getFollows = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetUserDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.user.follow || null;
};

export const getFollowers = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetUserDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.user.follower || null;
};

export const getTimeLine = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetTimelineDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.timeline || null;
};

export const getReaction = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetProfileDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.profile.reaction || null;
};

export const getRamenProfile = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetProfileDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.profile.ramen || null;
};

export const getLastAccess = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetLastAccessDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.lastAccess || null;
};

export const getFavoriteMusic = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetProfileDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.profile.music || null;
};

export const getFavoriteArtist = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetProfileDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.profile.artist || null;
};
