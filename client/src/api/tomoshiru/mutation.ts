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

export const createUser = async () => {
  const data = await (
    await client()
  )
    .mutate({
      mutation: schema.CreateUserDocument,
    })
    .catch(() => null);
  return data?.data?.createUser || null;
};

export const updateReaction = async (
  user_id_from: string,
  user_id_to: string,
  kind: "like"
) => {
  const data = await (
    await client()
  )
    .mutate({
      mutation: schema.UpdateReactionDocument,
      variables: {
        user_id_from: user_id_from,
        user_id_to: user_id_to,
        kind: kind,
      },
    })
    .catch(() => null);
  return data?.data?.updateReaction || null;
};

export const updateRamenProfile = async (
  user_id: string,
  ramenya: string,
  rank: number
) => {
  const data = await (
    await client()
  )
    .mutate({
      mutation: schema.UpdateRamenProfileDocument,
      variables: { user_id: user_id, ramenya: ramenya, rank: rank },
    })
    .catch(() => null);
  return data?.data?.updateRamenProfile || null;
};

export const postTimeLine = async (user_id: string, summary: string) => {
  const data = await (
    await client()
  )
    .mutate({
      mutation: schema.PostTimeLineDocument,
      variables: { user_id: user_id, summary: summary },
    })
    .catch(() => null);
  return data?.data?.postTimeLine || null;
};

export const updateFavoriteMusic = async (
  user_id: string,
  music: string,
  rank: number
) => {
  const data = await (
    await client()
  )
    .mutate({
      mutation: schema.UpdateFavoriteMusicDocument,
      variables: { user_id: user_id, music: music, rank: rank },
    })
    .catch(() => null);
  return data?.data?.updateFavoriteMusic || null;
};

export const updateFavoriteArtist = async (
  user_id: string,
  artist: string,
  rank: number
) => {
  const data = await (
    await client()
  )
    .mutate({
      mutation: schema.UpdateFavoriteArtistDocument,
      variables: { user_id: user_id, artist: artist, rank: rank },
    })
    .catch(() => null);
  return data?.data?.updateFavoriteArtist || null;
};

export const updateFollow = async (
  user_id_from: string,
  user_id_to: string,
  isFollow: boolean
) => {
  const data = await (
    await client()
  )
    .mutate({
      mutation: schema.UpdateFollowDocument,
      variables: {
        user_id_from: user_id_from,
        user_id_to: user_id_to,
        isFollow: isFollow,
      },
    })
    .catch(() => null);
  return data?.data?.updateFollow || null;
};
