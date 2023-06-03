import React from "react";
import { Avator, Card } from "@/ui";
import * as styles from "../styles/notice-card.css";
import { User } from "@/utils";

type Props = {
  user: User | null;
  profileType?: string;
  action?: string;
};

const _NoticeCard = ({ user, profileType, action }: Props) => {
  return (
    <Card>
      <div className={styles.contentStyle}>
        <Avator image={user?.image_url} size="small" />
        <p className={styles.actionStyle}>
          <span className={styles.userNameStyle}>{user?.user_name}</span>
          さんがあなたの{profileType}プロフィールに{action || "リアクション"}
          しました
        </p>
      </div>
    </Card>
  );
};

export const NoticeCard = _NoticeCard;
