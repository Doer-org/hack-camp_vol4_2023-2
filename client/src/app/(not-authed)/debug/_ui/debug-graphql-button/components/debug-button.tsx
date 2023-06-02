"use client";
import { graphqlClient } from "@/libs/graphql-client";
import { Button } from "@/ui";
import { GetUsersDocument } from "@/utils/graphql";

type Props = {
  color: "black" | "gray" | "pink";
  label: string;
};

const _DebugButton = ({ color, label }: Props) => {
  return (
    <Button
      color={color}
      onClick={() => {
        (async () => {
          const aaa = await graphqlClient.query({
            query: GetUsersDocument,
          });
          const data = aaa.data.getUsers;
          console.log("debug button clicked", data);
          return data;
        })();
      }}
    >
      {label}
    </Button>
  );
};

_DebugButton.displayName = "DebugButton";

export const DebugGraphQLButton = _DebugButton;
