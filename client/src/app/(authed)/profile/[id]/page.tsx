"use client";
import React, { useEffect, useState } from "react";
import * as commonStyles from "../../_styles/common.css";
import * as styles from "../_styles/profile.css";
import { Button, Like } from "@/ui";
import { RecomCard, ProfileHeader } from "@/app/_ui";
import Link from "next/link";
import { getUser } from "@/api";
import { User } from "@/utils";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  const [refUser, setRefUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const user = await getUser(params.id);
      setRefUser(user);
    })();
  }, [params.id]);

  return (
    <>
      {true ? ( // 自分かどうかを判定
        <>
          <ProfileHeader
            user={refUser}
            right={
              <Button color="black">
                <Link
                  href={`/profile/${params.id}/edit`}
                  className={styles.linkStyle}
                >
                  編集
                </Link>
              </Button>
            }
          />
        </>
      ) : (
        <>
          <ProfileHeader
            user={refUser}
            right={<Button color="black">フォロー中</Button>}
          />
        </>
      )}
      <div
        className={[
          commonStyles.containerStyle,
          commonStyles.headerAvoidStyle["profile"],
        ].join(" ")}
      >
        <div className={commonStyles.contentStyle}>
          <div className={styles.headStyle}>
            <div className={styles.categoriesStyle}>
              <Button color="gray">音楽</Button>
              <Button color="pink">本</Button>
            </div>
            <Like liked={true} num={20} />
          </div>
          <div className={styles.cardListStyle}>
            <div className={styles.cardStyle}>
              <RecomCard contentType="music" contentName="曲" />
            </div>
            <div className={styles.cardStyle}>
              <RecomCard contentType="person" contentName="アーティスト" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
