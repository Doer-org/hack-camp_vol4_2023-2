"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/ui";
import { User } from "@/utils";

type Props = {
  from: User;
  to: User;
};

const _FollowButton = ({ from, to }: Props) => {
  const [following, setFollowing] = useState<boolean>();

  useEffect(() => {
    // フォローを更新する処理
  }, [following]);

  const handleClick = () => {
    setFollowing((prev) => !prev);
  };

  return (
    <Button color="black" size="small" onClick={handleClick}>
      {following ? "フォロー中" : "フォローする"}
    </Button>
  );
};

export const FollowButton = _FollowButton;
