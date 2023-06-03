"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/ui";

type Props = {
  following: boolean;
  followed: boolean;
};

const _FollowButton = ({ following, followed }: Props) => {
  const [followingState, setFollowingState] = useState<boolean>();

  useEffect(() => {
    // フォローを更新する処理
  }, [followingState]);

  const handleClick = () => {
    setFollowingState((prev) => !prev);
  };

  return (
    <Button
      color={followingState ? "black" : "gray"}
      size="small"
      onClick={handleClick}
    >
      {followingState
        ? "フォロー中"
        : followed
        ? "フォローバック"
        : "フォローする"}
    </Button>
  );
};

export const FollowButton = _FollowButton;
