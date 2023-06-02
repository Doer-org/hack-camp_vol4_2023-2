"use client";
import { createUser, getUserByToken } from "@/api";
import { Button } from "@/ui";

export const Token2UserInfoButton = () => {
  return (
    <Button
      color={"black"}
      onClick={() => {
        (async () => {
          const userInfo = await (async () => {
            const resp = await getUserByToken();
            if (resp) {
              console.log("OK getUserByToken", resp);
              return resp;
            } else {
              const resp = await createUser();
              console.log("createUser", resp);
              return resp;
            }
          })();
          console.log("Result userInfo", userInfo);
        })();
      }}
    >
      初回ログインユーザならアカウント作成。2回目以降はユーザ情報を取得。
    </Button>
  );
};
