"use client";
import React, { useEffect, useState } from "react";
import { NoticeCard } from "@/app/_ui";
import * as styles from "../_styles/notification.css";
import { Label } from "@/ui";
import { getTimeLine, getUser } from "@/api";
import { User } from "@/utils";

type Props = {
  params: { id: string };
};

const debugUser: User = {
  user_id: "1",
  user_name: "Aoki",
};

const Page = ({ params }: Props) => {
  const [timelineDOM, setTimelineDOM] = useState<React.ReactNode[]>();

  useEffect(() => {
    (async () => {
      const timeline = await getTimeLine(params.id);
      const tlDOM: React.ReactNode[] = [];
      timeline?.forEach(async (tl) => {
        const user = await getUser(tl.user_id);
        tlDOM.push(
          <div className={styles.noticeStyle}>
            <NoticeCard user={user} action={tl.summary} />
          </div>
        );
      });
      setTimelineDOM(tlDOM);
    })();
  }, []);

  return (
    <div>
      <div className={styles.noticeStyle}>
        <NoticeCard user={debugUser} action="本プロフィールの内容を変更" />
      </div>
      {timelineDOM}
    </div>
  );
};

export default Page;
