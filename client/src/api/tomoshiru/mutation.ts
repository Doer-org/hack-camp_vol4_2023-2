import { graphqlClient } from "@/libs/graphql-client";
import * as schema from "@/utils/graphql";

export const createUser = async () => {
  const data = await graphqlClient
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
  const data = await graphqlClient
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
  const data = await graphqlClient
    .mutate({
      mutation: schema.UpdateRamenProfileDocument,
      variables: { user_id: user_id, ramenya: ramenya, rank: rank },
    })
    .catch(() => null);
  return data?.data?.updateRamenProfile || null;
};
