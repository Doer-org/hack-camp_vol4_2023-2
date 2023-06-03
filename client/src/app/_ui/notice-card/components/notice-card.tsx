import React from "react";
import { Avator, Card } from "@/ui";
import * as styles from "../styles/notice-card.css";
import { User } from "@/utils";

type Props = {
  user: User | null;
  action: string;
};

const _NoticeCard = ({ user, action }: Props) => {
  return (
    <Card>
      <div className={styles.contentStyle}>
        <Avator image={""} size="small" />
        <p className={styles.actionStyle}>
          <span className={styles.userNameStyle}>{user?.user_name}</span>
          さんが{action}しました！
        </p>
      </div>
    </Card>
  );
};

export const NoticeCard = _NoticeCard;
