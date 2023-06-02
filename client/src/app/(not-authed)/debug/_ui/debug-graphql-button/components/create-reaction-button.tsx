"use client";
import { updateReaction as createReaction, getUserByToken } from "@/api";
import { Button } from "@/ui";

export const CreateReactionButton = () => {
  return (
    <Button
      color={"black"}
      onClick={() => {
        (async () => {
          const resp = await getUserByToken();
          console.log("OK getUserByToken", resp);
          const createdReaction =
            resp && (await createReaction(resp.user_id, "cdf", "like"));
          console.log("Result createdReaction", createdReaction);
        })();
      }}
    >
      ユーザ cdf に like する
    </Button>
  );
};
