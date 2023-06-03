"use client";
import React, { useEffect, useState } from "react";
import { Arrow, Logo, Card, Avator } from "@/ui";
import { CommonHeader } from "@/app/_ui";
import * as commonStyles from "../../../_styles/common.css";
import * as styles from "../_styles/follow.css";
import { getFollows, getUser } from "@/api";
import { User } from "@/utils";
import { FollowButton } from "../../../_ui";

type Props = {
  params: { id: string };
};

const debugUser: User = {
  user_id: "1",
  user_name: "Aoki",
};

const Page = ({ params }: Props) => {
  const [followDOM, setFollowDOM] = useState<React.ReactNode[]>();

  useEffect(() => {
    (async () => {
      const follows = await getFollows(params.id);
      const fDOM: React.ReactNode[] = [];
      follows?.forEach(async (f) => {
        const user = await getUser(f.user_id);
        const following = true; // me は user をフォローしているかどうか
        const followed = false; // me は user にフォローされているかどうか
        fDOM.push(
          <Card>
            <div className={styles.cardStyle}>
              <div className={styles.cardUserStyle}>
                <Avator size="small" image="" />
                <span>{user?.user_name}</span>
              </div>
              <FollowButton following={following} followed={followed} />
            </div>
          </Card>
        );
        setFollowDOM(fDOM);
      });
    })();
  }, []);

  return (
    <>
      <CommonHeader title="フォロー" left={<Arrow />} right={<Logo />} />
      <div className={commonStyles.containerStyle}>
        <div className={commonStyles.contentStyle}>
          <Card>
            <div className={styles.cardStyle}>
              <div className={styles.cardUserStyle}>
                <Avator size="small" image="" />
                <span>{debugUser?.user_name}</span>
              </div>
              <FollowButton following={false} followed={true} />
            </div>
          </Card>
          {followDOM}
        </div>
      </div>
    </>
  );
};

export default Page;
