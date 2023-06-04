"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/ui";
import { User } from "@/utils";
import { getFollows, updateFollow } from "@/api";

type Props = {
  user_from: User;
  user_to: User;
};

const _FollowButton = ({ user_from, user_to }: Props) => {
  const [isFollow, setIsFollow] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const follows = await getFollows(user_from.user_id);
      if (follows?.filter((f) => f.user_id === user_to.user_id)) {
        setIsFollow(true);
      }
    })();
  }, []);

  const handleClick = () => {
    setIsFollow((prev) => {
      updateFollow(user_from.user_id, user_to.user_id, prev);
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
