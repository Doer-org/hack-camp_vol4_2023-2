import React from "react";
import * as styles from "../_styles/user-page.css";
import { Button, Like } from "@/ui";
import { RecomCard } from "@/app/_ui";

const Page = () => {
  return (
    <>
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
    </>
  );
};

export default Page;
