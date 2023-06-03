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
  return data?.data.getUserByToken || null;
};

export const getUsers = async () => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetUsersDocument,
    })
    .catch(() => null);
  return data && data.data.getUsers;
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
  return data?.data.user || null;
};

export const getFollows = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetFollowsDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getFollows || null;
};

export const getFollowers = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetFollowersDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getFollowers || null;
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
  return data?.data.getTimeline || null;
};

export const getReaction = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetReactionDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getReaction || null;
};

export const getRamenProfile = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetRamenProfileDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getRamenProfile || null;
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
  return data?.data.getLastAccess || null;
};

export const getFavoriteMusic = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetFavoriteMusicDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getFavoriteMusic || null;
};

export const getFavoriteArtist = async (user_id: string) => {
  const data = await (
    await client()
  )
    .query({
      query: schema.GetFavoriteArtistDocument,
      variables: { user_id },
    })
    .catch(() => null);
  return data?.data.getFavoriteArtist || null;
};
