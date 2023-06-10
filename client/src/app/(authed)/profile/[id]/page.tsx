"use client";
import { getAccessToken, getFavoriteArtist, getUser, readArtist } from "@/api";
import { ProfileHeader } from "@/app/_ui";
import { Button, Like } from "@/ui";
import { Data, User } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as commonStyles from "../../_styles/common.css";
import * as styles from "../_styles/profile.css";
import { RecomCard } from "../_ui";

type Me = {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  sub: string;
  sid: string;
};

type Props = {
  params: { id: string };
};

const guest: User extends { data: Data } ? Data : never = {
  user_id: "guest",
  user_name: "Guest",
  image_url: "",
};

const Page = ({ params }: Props) => {
  const [refUser, setRefUser] = useState<Data | null>(null);
  const [me, setMe] = useState<Me>();

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
      {/* {me?.sid === refUser?.user_id ? ( // 自分かどうかを判定 */}
      {true && refUser ? (
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
          {/* <ProfileHeader
            user={refUser}
            right={<Button color="black">フォロー中</Button>}
          /> */}
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
              <Button color="pink">音楽</Button>
              <Button color="gray">本</Button>
            </div>
            <Like user={refUser || guest} liked={true} />
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
