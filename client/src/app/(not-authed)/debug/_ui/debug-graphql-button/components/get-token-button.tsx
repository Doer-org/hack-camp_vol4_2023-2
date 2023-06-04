"use client";
import { fetchAuthInfo } from "@/api/auth";
import { Button } from "@/ui";

export const GetTokenButton = () => {
  return (
    <Button
      color={"black"}
      onClick={() => {
        (async () => {
          const resp = await fetchAuthInfo();
          console.log("OK resp", resp);
        })();
      }}
    >
      get token
    </Button>
  );
};
