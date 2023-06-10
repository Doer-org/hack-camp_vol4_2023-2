import { Avatar, Card } from "@/ui";
import { User } from "@/utils";
import * as styles from "../styles/notice-card.css";

type Props = {
  user: User extends { data: infer U } ? U : never | null;
  profileType?: string;
  action?: string;
};

const _NoticeCard = ({ user, profileType, action }: Props) => {
  return (
    <Card>
      <div className={styles.contentStyle}>
        <Avatar image={user?.image_url} size="small" />
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
