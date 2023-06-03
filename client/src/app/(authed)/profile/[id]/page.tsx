"use client";
import React from "react";
import * as commonStyles from "../../_styles/common.css";
import * as styles from "../_styles/profile.css";
import { Button, Like } from "@/ui";
import { RecomCard, ProfileHeader } from "@/app/_ui";
import Link from "next/link";

type Props = {
  params: { id: string };
};

const user = {
  name: "Aoki",
  icon: "https://avatars.githubusercontent.com/u/55625375?v=4",
  me: true,
  following: 20,
  follower: 20,
};

const Page = ({ params }: Props) => {
  return (
    <>
      {user.me ? (
        <ProfileHeader
          user={user}
          right={
            <Button color="black">
              <Link
                href={`/profile/${params.id}/edit`}
                className={styles.linkStyle}
              >
                編集
              </Link>
            </Button>
          }
        />
      ) : (
        <ProfileHeader
          user={user}
          right={<Button color="black">フォロー中</Button>}
        />
      )}
      <div className={commonStyles.containerStyle}>
        <div className={commonStyles.contentStyle}>
          <div className={styles.headStyle}>
            <div className={styles.categoriesStyle}>
              <Button color="gray">音楽</Button>
              <Button color="pink">本</Button>
            </div>
            <Like liked={true} num={20} />
          </div>
          <div className={styles.cardListStyle}>
            <div className={styles.cardStyle}>
              <RecomCard contentType="music" contentName="曲" />
            </div>
            <div className={styles.cardStyle}>
              <RecomCard contentType="person" contentName="アーティスト" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
