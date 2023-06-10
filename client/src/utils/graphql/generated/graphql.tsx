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
  createUser: Maybe<Data>;
  /** post timeline */
  postTimeLine: Maybe<Profile_Change_Log>;
  /** update favotrite artists */
  updateFavoriteArtist: Maybe<Music_Favorite_Artist>;
  /** update favorite music */
  updateFavoriteMusic: Maybe<Music_Favorite_Music>;
  /** update follow */
  updateFollow: Maybe<User_Follow>;
  /** update ramen profile */
  updateRamenProfile: Maybe<Ramen_Favorite_Ramenya>;
  /** update reaction */
  updateReaction: Maybe<Profile_Reaction>;
};

export type MutationPostTimeLineArgs = {
  summary: Scalars["String"]["input"];
  user_id: Scalars["String"]["input"];
};

export type MutationUpdateFavoriteArtistArgs = {
  artist: Scalars["String"]["input"];
  rank: Scalars["Int"]["input"];
  user_id: Scalars["String"]["input"];
};

export type MutationUpdateFavoriteMusicArgs = {
  music: Scalars["String"]["input"];
  rank: Scalars["Int"]["input"];
  user_id: Scalars["String"]["input"];
};

export type MutationUpdateFollowArgs = {
  isFollow: Scalars["Boolean"]["input"];
  user_id_from: Scalars["String"]["input"];
  user_id_to: Scalars["String"]["input"];
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
  allTimeline: Array<Profile_Change_Log>;
  /** get all users */
  allUsers: Array<Data>;
  /** get last access */
  lastAccess: Maybe<User_Log>;
  /** get profile */
  profile: Profile;
  /** get following users timeline */
  timeline: Array<Profile_Change_Log>;
  /** get user */
  user: User;
  /** getUserByToken */
  userByToken: Maybe<Data>;
};

export type QueryLastAccessArgs = {
  user_id: Scalars["String"]["input"];
};

export type QueryProfileArgs = {
  user_id: Scalars["String"]["input"];
};

export type QueryTimelineArgs = {
  user_id: Scalars["String"]["input"];
};

export type QueryUserArgs = {
  user_id: Scalars["String"]["input"];
};

/** user data */
export type Data = {
  __typename?: "data";
  image_url: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
  user_name: Scalars["String"]["output"];
};

/** アーティスト */
export type Music_Favorite_Artist = {
  __typename?: "music_favorite_artist";
  artist: Scalars["String"]["output"];
  rank: Scalars["Int"]["output"];
  timestamp: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
};

/** 音楽 */
export type Music_Favorite_Music = {
  __typename?: "music_favorite_music";
  music: Scalars["String"]["output"];
  rank: Scalars["Int"]["output"];
  timestamp: Scalars["String"]["output"];
  user_id: Scalars["String"]["output"];
};

/** プロフィール */
export type Profile = {
  __typename?: "profile";
  artist: Array<Music_Favorite_Artist>;
  music: Array<Music_Favorite_Music>;
  ramen: Array<Ramen_Favorite_Ramenya>;
  reaction: Array<Profile_Reaction>;
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
  data: Data;
  follow: Array<Data>;
  follower: Array<Data>;
  user_log: Maybe<User_Log>;
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

export type CreateUserMutationVariables = Exact<{ [key: string]: never }>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser: {
    __typename?: "data";
    user_name: string;
    user_id: string;
    image_url: string;
  } | null;
};

export type UpdateReactionMutationVariables = Exact<{
  user_id_from: Scalars["String"]["input"];
  user_id_to: Scalars["String"]["input"];
  kind: Scalars["String"]["input"];
}>;

export type UpdateReactionMutation = {
  __typename?: "Mutation";
  updateReaction: {
    __typename?: "profile_reaction";
    user_id_from: string;
    user_id_to: string;
    kind: string;
    timestamp: string;
  } | null;
};

export type UpdateRamenProfileMutationVariables = Exact<{
  user_id: Scalars["String"]["input"];
  ramenya: Scalars["String"]["input"];
  rank: Scalars["Int"]["input"];
}>;

export type UpdateRamenProfileMutation = {
  __typename?: "Mutation";
  updateRamenProfile: {
    __typename?: "ramen_favorite_ramenya";
    user_id: string;
    ramenya: string;
    rank: number;
    timestamp: string;
  } | null;
};

export type PostTimeLineMutationVariables = Exact<{
  user_id: Scalars["String"]["input"];
  summary: Scalars["String"]["input"];
}>;

export type PostTimeLineMutation = {
  __typename?: "Mutation";
  postTimeLine: {
    __typename?: "profile_change_log";
    user_id: string;
    summary: string;
    timestamp: string;
  } | null;
};

export type UpdateFavoriteMusicMutationVariables = Exact<{
  user_id: Scalars["String"]["input"];
  rank: Scalars["Int"]["input"];
  music: Scalars["String"]["input"];
}>;

export type UpdateFavoriteMusicMutation = {
  __typename?: "Mutation";
  updateFavoriteMusic: {
    __typename?: "music_favorite_music";
    user_id: string;
    rank: number;
    music: string;
    timestamp: string;
  } | null;
};

export type UpdateFavoriteArtistMutationVariables = Exact<{
  user_id: Scalars["String"]["input"];
  rank: Scalars["Int"]["input"];
  artist: Scalars["String"]["input"];
}>;

export type UpdateFavoriteArtistMutation = {
  __typename?: "Mutation";
  updateFavoriteArtist: {
    __typename?: "music_favorite_artist";
    user_id: string;
    rank: number;
    artist: string;
    timestamp: string;
  } | null;
};

export type UpdateFollowMutationVariables = Exact<{
  user_id_from: Scalars["String"]["input"];
  user_id_to: Scalars["String"]["input"];
  isFollow: Scalars["Boolean"]["input"];
}>;

export type UpdateFollowMutation = {
  __typename?: "Mutation";
  updateFollow: {
    __typename?: "user_follow";
    user_id_from: string;
    user_id_to: string;
  } | null;
};

export type GetUserByTokenQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserByTokenQuery = {
  __typename?: "Query";
  userByToken: {
    __typename?: "data";
    user_id: string;
    user_name: string;
    image_url: string;
  } | null;
};

export type GetUserQueryVariables = Exact<{
  user_id: Scalars["String"]["input"];
}>;

export type GetUserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "user";
    data: {
      __typename?: "data";
      user_id: string;
      user_name: string;
      image_url: string;
    };
    follow: Array<{
      __typename?: "data";
      user_id: string;
      user_name: string;
      image_url: string;
    }>;
    follower: Array<{
      __typename?: "data";
      user_id: string;
      user_name: string;
      image_url: string;
    }>;
    user_log: {
      __typename?: "user_log";
      user_id: string;
      timeline_last_access: string;
    } | null;
  };
};

export type GetProfileQueryVariables = Exact<{
  user_id: Scalars["String"]["input"];
}>;

export type GetProfileQuery = {
  __typename?: "Query";
  profile: {
    __typename?: "profile";
    ramen: Array<{
      __typename?: "ramen_favorite_ramenya";
      ramenya: string;
      rank: number;
      timestamp: string;
      user_id: string;
    }>;
    music: Array<{
      __typename?: "music_favorite_music";
      user_id: string;
      music: string;
      rank: number;
      timestamp: string;
    }>;
    artist: Array<{
      __typename?: "music_favorite_artist";
      user_id: string;
      artist: string;
      rank: number;
      timestamp: string;
    }>;
    reaction: Array<{
      __typename?: "profile_reaction";
      user_id_from: string;
      user_id_to: string;
      timestamp: string;
      kind: string;
    }>;
  };
};

export type GetTimelineQueryVariables = Exact<{
  user_id: Scalars["String"]["input"];
}>;

export type GetTimelineQuery = {
  __typename?: "Query";
  timeline: Array<{
    __typename?: "profile_change_log";
    user_id: string;
    timestamp: string;
    summary: string;
  }>;
};

export type GetLastAccessQueryVariables = Exact<{
  user_id: Scalars["String"]["input"];
}>;

export type GetLastAccessQuery = {
  __typename?: "Query";
  lastAccess: {
    __typename?: "user_log";
    user_id: string;
    timeline_last_access: string;
  } | null;
};

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllUsersQuery = {
  __typename?: "Query";
  allUsers: Array<{
    __typename?: "data";
    user_id: string;
    user_name: string;
    image_url: string;
  }>;
};

export type GetAllTimelineQueryVariables = Exact<{
  user_id: Scalars["String"]["input"];
}>;

export type GetAllTimelineQuery = {
  __typename?: "Query";
  allTimeline: Array<{
    __typename?: "profile_change_log";
    user_id: string;
    summary: string;
    timestamp: string;
  }>;
};

export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createUser" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_name" } },
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "image_url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateReactionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateReaction" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id_from" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id_to" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "kind" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateReaction" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id_from" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id_from" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id_to" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id_to" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "kind" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "kind" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user_id_from" },
                },
                { kind: "Field", name: { kind: "Name", value: "user_id_to" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateReactionMutation,
  UpdateReactionMutationVariables
>;
export const UpdateRamenProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateRamenProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "ramenya" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rank" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateRamenProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "ramenya" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "ramenya" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rank" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "rank" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "ramenya" } },
                { kind: "Field", name: { kind: "Name", value: "rank" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateRamenProfileMutation,
  UpdateRamenProfileMutationVariables
>;
export const PostTimeLineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "postTimeLine" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "summary" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "postTimeLine" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "summary" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "summary" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "summary" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  PostTimeLineMutation,
  PostTimeLineMutationVariables
>;
export const UpdateFavoriteMusicDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateFavoriteMusic" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rank" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "music" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateFavoriteMusic" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rank" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "rank" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "music" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "music" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "rank" } },
                { kind: "Field", name: { kind: "Name", value: "music" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateFavoriteMusicMutation,
  UpdateFavoriteMusicMutationVariables
>;
export const UpdateFavoriteArtistDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateFavoriteArtist" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "rank" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "artist" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateFavoriteArtist" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "rank" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "rank" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "artist" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "artist" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "rank" } },
                { kind: "Field", name: { kind: "Name", value: "artist" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateFavoriteArtistMutation,
  UpdateFavoriteArtistMutationVariables
>;
export const UpdateFollowDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateFollow" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id_from" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id_to" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "isFollow" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateFollow" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id_from" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id_from" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id_to" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id_to" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "isFollow" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "isFollow" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user_id_from" },
                },
                { kind: "Field", name: { kind: "Name", value: "user_id_to" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateFollowMutation,
  UpdateFollowMutationVariables
>;
export const GetUserByTokenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUserByToken" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "userByToken" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "user_name" } },
                { kind: "Field", name: { kind: "Name", value: "image_url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserByTokenQuery, GetUserByTokenQueryVariables>;
export const GetUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "user" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "data" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_id" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "image_url" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "follow" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_id" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "image_url" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "follower" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_id" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_name" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "image_url" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user_log" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_id" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "timeline_last_access" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "profile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "ramen" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "ramenya" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "rank" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "timestamp" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_id" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "music" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_id" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "music" } },
                      { kind: "Field", name: { kind: "Name", value: "rank" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "timestamp" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "artist" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_id" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "artist" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "rank" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "timestamp" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "reaction" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_id_from" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "user_id_to" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "timestamp" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProfileQuery, GetProfileQueryVariables>;
export const GetTimelineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getTimeline" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "timeline" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "summary" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTimelineQuery, GetTimelineQueryVariables>;
export const GetLastAccessDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getLastAccess" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "lastAccess" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "user_id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "user_id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "timeline_last_access" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLastAccessQuery, GetLastAccessQueryVariables>;
export const GetAllUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAllUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allUsers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "user_name" } },
                { kind: "Field", name: { kind: "Name", value: "image_url" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetAllTimelineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "getAllTimeline" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "user_id" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "allTimeline" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "user_id" } },
                { kind: "Field", name: { kind: "Name", value: "summary" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllTimelineQuery, GetAllTimelineQueryVariables>;
