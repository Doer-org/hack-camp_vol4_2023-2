import React, { useState } from "react";
import * as styles from "../_styles/profile.css";
import { Button, Like } from "@/ui";
import { RecomCard, ProfileHeader } from "@/app/_ui";

const user = {
  name: "Aoki",
  icon: "https://avatars.githubusercontent.com/u/55625375?v=4",
  me: true,
  following: 20,
  follower: 20,
};

const Page = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEdit(true);
  };

  return (
    <>
      {user.me ? (
        <ProfileHeader
          user={user}
          right={
            <Button color="black" onClick={handleEditClick}>
              編集
            </Button>
          }
        />
      ) : (
        <ProfileHeader
          user={user}
          right={<Button color="black">フォロー中</Button>}
        />
      )}
      <div className={styles.containerStyle}>
        <div className={styles.contentStyle}>
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
