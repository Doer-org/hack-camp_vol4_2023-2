"use client";
import { getTimeLine, getUserByToken } from "@/api";
import { Button } from "@/ui";

export const GetMyTimelineButton = () => {
  return (
    <Button
      color={"black"}
      onClick={() => {
        (async () => {
          const resp = await getUserByToken();
          console.log("OK getUserByToken", resp);
          const timeline = resp && (await getTimeLine(resp.user_id));
          console.log("Result Timeline", timeline);
        })();
      }}
    >
      タイムライン取得＆最終アクセス更新
    </Button>
  );
};
