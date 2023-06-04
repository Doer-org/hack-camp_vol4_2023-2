"use client";
import React, { useEffect, useState } from "react";
import * as styles from "../styles/like.css";
import { getReaction, updateReaction } from "@/api";
import { User } from "@/utils";

type Me = {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  sub: string;
  sid: string;
};

type Props = {
  liked: boolean;
  num?: number;
  user: User;
};

const _Like = ({ liked, num, user, ...props }: Props) => {
  const [likedState, setLikedState] = useState<boolean>(liked);
  const [numState, setNumState] = useState<number>(num || 0);
  const [color, setColor] = useState<"pink" | "gray">(liked ? "pink" : "gray");
  const [me, setMe] = useState<Me>();

  useEffect(() => {
    (async () => {
      const reactions = await getReaction(user.user_id);
      const reactionedNum = reactions?.filter(
        (r) => r.user_id_to === user.user_id
      ).length;
      setNumState(reactionedNum || 0);
    })();
  }, [likedState]);

  const handleClick = () => {
    setLikedState((prevLiked) => {
      if (prevLiked) {
        setColor("gray");
        // 削除処理を書く
      } else {
        setColor("pink");
        updateReaction(me?.sid || "guest", user.user_id, "like");
      }
      return !prevLiked;
    });
  };

  return (
    <div className={styles.wrapperStyle} onClick={handleClick}>
      <div className={styles.contentStyle}>
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={styles.fill[color]}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.95254 11.6845C-0.650874 9.08102 -0.650845 4.85998 1.95262 2.25652C4.55612 -0.34698 8.77722 -0.34698 11.3807 2.25652C13.9841 -0.34698 18.2052 -0.34698 20.8087 2.25652C23.4122 4.86001 23.4122 9.08111 20.8087 11.6846L20.7918 11.7015L11.3805 21.1127L1.95244 11.6846L1.95254 11.6845Z"
            fill="#FF7987"
          />
        </svg>
        <span className={[styles.numStyle, styles.color[color]].join(" ")}>
          {numState}
        </span>
      </div>
    </div>
  );
};

export const Like = _Like;
