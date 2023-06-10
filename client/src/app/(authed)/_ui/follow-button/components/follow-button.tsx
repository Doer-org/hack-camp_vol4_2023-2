"use client";
import { updateFollow } from "@/api";
import { Button } from "@/ui";
import { User } from "@/utils";
import { useState } from "react";

type Props = {
  user_from: User extends { data: infer U } ? U : never;
  user_to: User extends { data: infer U } ? U : never;
  followType: "follow" | "follower";
  following: boolean;
};

const _FollowButton = ({
  user_from,
  user_to,
  followType,
  following,
}: Props) => {
  const [isFollow, setIsFollow] = useState<boolean>(following);

  const handleClick = () => {
    setIsFollow((prev) => {
      (async () => {
        await updateFollow(user_from.user_id, user_to.user_id, !prev);
      })();
      return !prev;
    });
  };

  return (
    <Button
      color={isFollow ? "black" : "gray"}
      size="small"
      onClick={handleClick}
    >
      {isFollow ? "フォロー中" : "フォローする"}
    </Button>
  );
};

export const FollowButton = _FollowButton;
