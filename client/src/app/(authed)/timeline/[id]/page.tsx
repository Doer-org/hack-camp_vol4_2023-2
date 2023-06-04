"use client";
import React, { useEffect, useState } from "react";
import { NoticeCard } from "@/app/_ui";
import * as styles from "../_styles/timeline.css";
import { Label } from "@/ui";
import { getTimeLine, getUser } from "@/api";
import { User } from "@/utils";
import { Avator, Card } from "@/ui";

type Props = {
  params: { id: string };
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
          <div className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardInnerStyle}>
                <Avator image={user?.image_url} size="small" />
                <p className={styles.actionStyle}>
                  <span className={styles.userNameStyle}>
                    {user?.user_name}
                  </span>
                  さんが{tl.summary}
                </p>
              </div>
            </Card>
          </div>
        );
      });
      setTimelineDOM(tlDOM);
    })();
  }, []);

  return (
    <div>
      {timelineDOM}
      <div className={styles.cardWrapperStyle}>
        <Card>
          <div className={styles.cardInnerStyle}>
            <Avator
              image={
                "https://avatars.githubusercontent.com/u/55625375?s=64&v=4"
              }
              size="small"
            />
            <p className={styles.actionStyle}>
              <span className={styles.userNameStyle}>Aoki</span>
              さんが音楽プロフィールの内容を変更しました！
            </p>
          </div>
        </Card>
      </div>
      <div className={styles.cardWrapperStyle}>
        <Card>
          <div className={styles.cardInnerStyle}>
            <Avator
              image={
                "https://avatars.githubusercontent.com/u/134147341?s=64&v=4"
              }
              size="small"
            />
            <p className={styles.actionStyle}>
              <span className={styles.userNameStyle}>さき</span>
              さんが本プロフィールの内容を変更しました！
            </p>
          </div>
        </Card>
      </div>
      <div className={styles.cardWrapperStyle}>
        <Card>
          <div className={styles.cardInnerStyle}>
            <Avator
              image={
                "https://avatars.githubusercontent.com/u/113420384?s=64&v=4"
              }
              size="small"
            />
            <p className={styles.actionStyle}>
              <span className={styles.userNameStyle}>yuga</span>
              さんが新しく本プロフィールを作成しました！
            </p>
          </div>
        </Card>
      </div>
      <div className={styles.cardWrapperStyle}>
        <Card>
          <div className={styles.cardInnerStyle}>
            <Avator
              image={
                "https://avatars.githubusercontent.com/u/134787738?s=60&v=4"
              }
              size="small"
            />
            <p className={styles.actionStyle}>
              <span className={styles.userNameStyle}>Ayano</span>
              さんが新しく本プロフィールを作成しました！
            </p>
          </div>
        </Card>
      </div>
      <div className={styles.cardWrapperStyle}>
        <Card>
          <div className={styles.cardInnerStyle}>
            <Avator
              image={"https://avatars.githubusercontent.com/u/86759515?v=4"}
              size="small"
            />
            <p className={styles.actionStyle}>
              <span className={styles.userNameStyle}>Yasuda</span>
              さんが新しく音楽プロフィールを作成しました！
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
