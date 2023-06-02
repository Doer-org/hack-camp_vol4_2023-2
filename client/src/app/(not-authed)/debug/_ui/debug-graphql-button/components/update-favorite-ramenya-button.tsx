"use client";
import { getUserByToken, updateRamenProfile } from "@/api";
import { Button } from "@/ui";

export const UpdateFavoriteRamenya = () => {
  return (
    <Button
      color={"black"}
      onClick={() => {
        (async () => {
          const resp = await getUserByToken();
          console.log("OK getUserByToken", resp);
          const updated_ramenya =
            resp && (await updateRamenProfile(resp.user_id, "ふくせんろう", 1));
          console.log("Result updated_ramenya", updated_ramenya);
        })();
      }}
    >
      ふくせんろうはせかいいち
    </Button>
  );
};
