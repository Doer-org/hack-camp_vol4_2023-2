"use client";
import React, { useEffect, useState } from "react";
import { Arrow, Logo, Card, Avator, Like } from "@/ui";
import { CommonHeader } from "@/app/_ui";
import * as commonStyles from "../../_styles/common.css";
import * as styles from "../_styles/bookmark.css";
import { getUsers } from "@/api";
import { User } from "@/utils";

type Props = {
  params: { id: string };
};

const debugUser: User = {
  user_id: "1",
  user_name: "Aoki",
};

const Page = ({ params }: Props) => {
  const [profileDOM, setProfileDOM] = useState<React.ReactNode[]>();

  useEffect(() => {
    (async () => {
      const users = await getUsers(); // いいねしたプロフィールだけを取り出してきたい
      const pDOM: React.ReactNode[] = [];
      users?.forEach(async (u) => {
        pDOM.push(
          <div key={u.user_id} className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardInnerStyle}>
                <div className={styles.cardUserStyle}>
                  <Avator size="small" image="" />
                  <div>
                    <span className={styles.cardUserNameStyle}>
                      {u?.user_name}
                    </span>
                    さんの音楽プロフィール
                  </div>
                </div>
                <Like num={24} liked={true} />
              </div>
            </Card>
          </div>
        );
        setProfileDOM(pDOM);
      });
    })();
  }, []);

  return (
    <>
      <CommonHeader
        title="いいねしたプロフィール"
        left={<Arrow />}
        right={<Logo />}
      />
      <div
        className={[
          commonStyles.containerStyle,
          commonStyles.headerAvoidStyle["common"],
        ].join(" ")}
      >
        <div className={commonStyles.contentStyle}>{profileDOM}</div>
      </div>
    </>
  );
};

export default Page;
