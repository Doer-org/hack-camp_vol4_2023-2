import React from "react";
import { Avator, Card } from "@/ui";
import * as styles from "../styles/notice-card.css";

type User = {
  name: string;
  icon: string;
};

type Props = {
  user: User;
  action: string;
};

const _NoticeCard = ({ user, action }: Props) => {
  return (
    <Card>
      <div className={styles.contentStyle}>
        <Avator image={user.icon} size="small" />
        <p className={styles.actionStyle}>
          <span className={styles.userNameStyle}>{user.name}</span>
          さんが{action}しました！
        </p>
      </div>
    </Card>
  );
};

export const NoticeCard = _NoticeCard;
