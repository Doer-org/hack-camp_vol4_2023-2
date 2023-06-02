import React from "react";
import { NoticeCard } from "../../_ui";
import * as styles from "./_styles/timeline.css";
import { Label } from "@/ui";

const user = {
  id: 1,
  icon: "https://avatars.githubusercontent.com/u/55625375?v=4",
  name: "Aoki",
};

export default function Page() {
  return (
    <div>
      <div className={styles.noticeStyle}>
        <NoticeCard user={user} action="本プロフィールの内容を変更" />
      </div>
      <div className={styles.noticeStyle}>
        <NoticeCard user={user} action="本プロフィールの内容を変更" />
      </div>
      <div className={styles.labelStyle}>
        <Label />
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
  );
}
