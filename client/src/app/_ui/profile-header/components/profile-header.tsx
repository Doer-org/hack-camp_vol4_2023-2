import React from "react";
import * as styles from "../styles/profile-header.css";
import { Avator, Button, Header, Logo } from "@/ui";
import { User } from "@/utils";
import { getFollows, getFollowers } from "@/api";

type Props = {
  user: User | null;
  right?: React.ReactNode;
};

const _ProfileHeader = async ({ user, right }: Props) => {
  const follows = await getFollows(user?.user_id || "0");
  const followers = await getFollowers(user?.user_id || "0");

  return (
    <Header>
      <div className={styles.headStyle}>
        <div className={styles.profileStyle}>
          <Avator
            size="medium"
            image="https://avatars.githubusercontent.com/u/55625375?v=4"
          />
          <span>{user?.user_name}</span>
        </div>
        {right}
      </div>
      <div className={styles.followWrapperStyle}>
        <span className={styles.followStyle}>
          <span className={styles.followCountStyle}>{follows?.length}</span>
          <span className={styles.followlabelStyle}>フォロー</span>
        </span>
        <span className={styles.followStyle}>
          <span className={styles.followCountStyle}>{followers?.length}</span>
          <span className={styles.followlabelStyle}>フォロワー</span>
        </span>
      </div>
    </Header>
  );
};

export const ProfileHeader = _ProfileHeader;
