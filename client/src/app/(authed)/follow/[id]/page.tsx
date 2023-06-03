"use client";
import React, { useEffect, useState } from "react";
import { Arrow, Logo, Card, Avator, Button } from "@/ui";
import { CommonHeader } from "@/app/_ui";
import * as styles from "../_styles/follow.css";
import { getFollows, getUser } from "@/api";
import { User } from "@/utils";

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
        fDOM.push(
          <Card>
            <div className={styles.cardStyle}>
              <div className={styles.cardUserStyle}>
                <Avator size="small" image="" />
                <span>{user?.user_name}</span>
              </div>
              <Button color="black" size="small">
                フォロー中
              </Button>
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
      <div className={styles.containerStyle}>
        <div className={styles.contentStyle}>{followDOM}</div>
      </div>
    </>
  );
};

export default Page;
