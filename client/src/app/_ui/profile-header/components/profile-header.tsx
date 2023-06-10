"use client";
import { getFollowers, getFollows } from "@/api";
import { Avatar, Header } from "@/ui";
import { User } from "@/utils";
import React, { useEffect, useState } from "react";
import * as styles from "../styles/profile-header.css";

type Props = {
  user: User extends { data: infer U } ? U : never | null;
  right?: React.ReactNode;
};

const _ProfileHeader = ({ user, right }: Props) => {
  const [followNum, setFollowNum] = useState<number>();
  const [followerNum, setFollowerNum] = useState<number>();

  useEffect(() => {
    (async () => {
      const follows = await getFollows(user?.user_id || "0");
      const followers = await getFollowers(user?.user_id || "0");
      setFollowNum(follows?.length);
      setFollowerNum(followers?.length);
    })();
  }, [user?.user_id]);

  return (
    <Header>
      <div className={styles.headStyle}>
        <div className={styles.profileStyle}>
          <Avatar size="medium" image={user?.image_url} />
          <span>{user?.user_name}</span>
        </div>
        {right}
      </div>
      <div className={styles.followWrapperStyle}>
        <span className={styles.followStyle}>
          <span className={styles.followCountStyle}>{followNum}</span>
          <span className={styles.followlabelStyle}>フォロー</span>
        </span>
        <span className={styles.followStyle}>
          <span className={styles.followCountStyle}>{followerNum}</span>
          <span className={styles.followlabelStyle}>フォロワー</span>
        </span>
      </div>
    </Header>
  );
};

export const ProfileHeader = _ProfileHeader;
