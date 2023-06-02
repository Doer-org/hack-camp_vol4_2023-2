"use client";
import React from "react";
import { ProfileHeader } from "@/app/_ui";
import * as styles from "../_styles/user-layout.css";

const user = {
  name: "Aoki",
  icon: "https://avatars.githubusercontent.com/u/55625375?v=4",
  me: false,
  following: 20,
  follower: 20,
};

export const CommmonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProfileHeader user={user} />
      <div className={styles.containerStyle}>
        <div className={styles.contentStyle}>{children}</div>
      </div>
    </>
  );
};

export default CommmonLayout;
