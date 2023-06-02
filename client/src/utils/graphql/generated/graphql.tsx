import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  URI: { input: any; output: any };
};

export type Mutation = {
  __typename?: "Mutation";
  /** create user */
  createUser: Maybe<User>;
  /** update ramen profile */
  updateRamenProfile: Maybe<Ramen_Favorite_Ramenya>;
  /** update reaction */
  updateReaction: Maybe<Profile_Reaction>;
};

export type MutationUpdateRamenProfileArgs = {
  ramenya: Scalars["String"]["input"];
  rank: Scalars["Int"]["input"];
  user_id: Scalars["String"]["input"];
};

export type MutationUpdateReactionArgs = {
  kind: Scalars["String"]["input"];
  user_id_from: Scalars["String"]["input"];
  user_id_to: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  /** get all users timeline */
  getAllTimeline: Array<Profile_Change_Log>;
  /** get followers */
  getFollowers: Array<User>;
  /** get follows */
  getFollows: Array<User>;
  /** get profile */
  getProfile: Maybe<Profile>;
  /** get ramen profile */
  getRamenProfile: Array<Ramen_Favorite_Ramenya>;
  /** get reaction */
  getReaction: Array<Profile_Reaction>;
  /** get following users timeline */
  getTimeline: Array<Profile_Change_Log>;
  /** get all users */
  getUsers: Array<User>;
  /** get user */
  user: Maybe<User>;
};

export type QueryGetFollowersArgs = {
  user_id: Scalars["String"]["input"];
};

export type QueryGetFollowsArgs = {
  user_id: Scalars["String"]["input"];
};

export type QueryGetProfileArgs = {
  user_id: Scalars["String"]["input"];
};

export type QueryGetRamenProfileArgs = {
  user_id: Scalars["String"]["input"];
};

export type QueryGetReactionArgs = {
  user_id: Scalars["String"]["input"];
};

export type QueryGetTimelineArgs = {
  user_id: Scalars["String"]["input"];
};

export type QueryUserArgs = {
  user_id: Scalars["String"]["input"];
};

/** アーティスト */
export type Music_Favorite_Artist = {
  __typename?: "music_favorite_artist";
  artist_info: Scalars["String"]["output"];
  rank: Scalars["Int"]["output"];
  timestamp: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
};

/** 音楽 */
export type Music_Favorite_Music = {
  __typename?: "music_favorite_music";
  artist_info: Scalars["String"]["output"];
  rank: Scalars["Int"]["output"];
  timestamp: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
};

/** プロフィール */
export type Profile = {
  __typename?: "profile";
  details: Scalars["String"]["output"];
  timestamp: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
};

/** 変更履歴 */
export type Profile_Change_Log = {
  __typename?: "profile_change_log";
  summary: Scalars["String"]["output"];
  timestamp: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
};

/** リアクション */
export type Profile_Reaction = {
  __typename?: "profile_reaction";
  kind: Scalars["String"]["output"];
  timestamp: Scalars["String"]["output"];
  user_id_from: Scalars["String"]["output"];
  user_id_to: Scalars["String"]["output"];
};

/** ラーメン屋 */
export type Ramen_Favorite_Ramenya = {
  __typename?: "ramen_favorite_ramenya";
  ramenya: Scalars["String"]["output"];
  rank: Scalars["Int"]["output"];
  timestamp: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
};

/** user */
export type User = {
  __typename?: "user";
  user_id: Scalars["String"]["output"];
  user_name: Scalars["String"]["output"];
};

/** Follow */
export type User_Follow = {
  __typename?: "user_follow";
  user_id_from: Scalars["String"]["output"];
  user_id_to: Scalars["String"]["output"];
};

/** タイムラインの最終アクセスがいつか */
export type User_Log = {
  __typename?: "user_log";
  timeline_last_access: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: "Query";
  getUsers: Array<{ __typename?: "user"; user_id: string; user_name: string }>;
};

export const GetUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "user_name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
