"use client";
import React, { useEffect, useState } from "react";
import { NoticeCard } from "@/app/_ui";
import * as styles from "../_styles/notification.css";
import { Label } from "@/ui";
import { getReaction, getUser } from "@/api";
import { User } from "@/utils";

type Props = {
  params: { id: string };
};

const debugUser: User = {
  user_id: "1",
  user_name: "Aoki",
};

const kind2ja = new Map([["like", "いいね！"]]);

const Page = ({ params }: Props) => {
  const [notificationDOM, setNotificationDOM] = useState<React.ReactNode[]>();

  useEffect(() => {
    (async () => {
      const reactions = await getReaction(params.id);
      const notifications = reactions?.filter(
        (r) => r.user_id_to === params.id
      );
      const nDOM: React.ReactNode[] = [];
      notifications?.forEach(async (n) => {
        const user = await getUser(n.user_id_from);
        nDOM.push(
          <div
            key={n.user_id_from + n.timestamp}
            className={styles.noticeStyle}
          >
            <NoticeCard user={user} action={kind2ja.get(n.kind)} />
          </div>
        );
      });
      setNotificationDOM(nDOM);
    })();
  }, []);

  return (
    <div>
      <div className={styles.noticeStyle}>
        <NoticeCard user={debugUser} action="いいね！" />
      </div>
      <div className={styles.noticeStyle}>
        <NoticeCard user={debugUser} action="いいね！" />
      </div>
      {notificationDOM}
    </div>
  );
};

export default Page;
