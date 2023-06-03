"use client";
import React, { useEffect, useState } from "react";
import * as commonStyles from "../../_styles/common.css";
import * as styles from "../_styles/profile.css";
import { Button, Like } from "@/ui";
import { ProfileHeader } from "@/app/_ui";
import { RecomCard } from "../_ui";
import Link from "next/link";
import { getUser, getFavoriteArtist, getAccessToken, readArtist } from "@/api";
import { User } from "@/utils";

type Props = {
  params: { id: string };
};

const Page = ({ params }: Props) => {
  const [refUser, setRefUser] = useState<User | null>(null);

  const [firstImage, setFirstImage] = useState<string>();
  const [secondImage, setSecondImage] = useState<string>();
  const [thirdImage, setThirdImage] = useState<string>();

  useEffect(() => {
    (async () => {
      const user = await getUser(params.id);
      setRefUser(user);

      const artists = await getFavoriteArtist(user?.user_id || "0");
      const first = artists?.filter((a) => a.rank === 1)[0];
      const second = artists?.filter((a) => a.rank === 2)[0];
      const third = artists?.filter((a) => a.rank === 3)[0];

      const token = await getAccessToken();
      if (first) {
        const sArtist = await readArtist(first.artist, token);
        if (sArtist?.type !== "error") {
          setFirstImage(sArtist?.value.images[2].url);
        }
      }
      if (second) {
        const sArtist = await readArtist(second.artist, token);
        if (sArtist?.type !== "error") {
          setSecondImage(sArtist?.value.images[2].url);
        }
      }
      if (third) {
        const sArtist = await readArtist(third.artist, token);
        if (sArtist?.type !== "error") {
          setThirdImage(sArtist?.value.images[2].url);
        }
      }
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
              <RecomCard
                contentType="person"
                contentName="アーティスト"
                firstImage={firstImage}
                secondImage={secondImage}
                thirdImage={thirdImage}
              />
            </div>
            <div className={styles.cardStyle}>
              <RecomCard contentType="music" contentName="曲" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
