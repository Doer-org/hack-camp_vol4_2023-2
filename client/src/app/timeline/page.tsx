import React from "react";
import { NoticeCard } from "../_ui";
import * as styles from "./_styles/timeline.css";

const user = {
  id: 1,
  icon: "https://avatars.githubusercontent.com/u/55625375?v=4",
  name: "Aoki",
};

export default function Page() {
  return (
    <>
      <div className={styles.containerStyle}>
        <div className={styles.contentStyle}>
          <div className={styles.noticeStyle}>
            <NoticeCard user={user} action="本プロフィールの内容を変更" />
          </div>
          <div className={styles.noticeStyle}>
            <NoticeCard user={user} action="本プロフィールの内容を変更" />
          </div>
          <div className={styles.noticeStyle}>
            <NoticeCard user={user} action="本プロフィールの内容を変更" />
          </div>
          <div className={styles.noticeStyle}>
            <NoticeCard user={user} action="本プロフィールの内容を変更" />
          </div>
          <div className={styles.noticeStyle}>
            <NoticeCard user={user} action="本プロフィールの内容を変更" />
          </div>
          <div className={styles.noticeStyle}>
            <NoticeCard user={user} action="本プロフィールの内容を変更" />
          </div>
          <div className={styles.noticeStyle}>
            <NoticeCard user={user} action="本プロフィールの内容を変更" />
          </div>
          <div className={styles.noticeStyle}>
            <NoticeCard user={user} action="本プロフィールの内容を変更" />
          </div>
        </div>
      </div>
    </>
  );
}
