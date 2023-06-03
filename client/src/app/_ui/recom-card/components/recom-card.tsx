"use client";
import { Card } from "@/ui";
import { Ranking } from "@/ui/ranking/components";
import React, { useEffect, useState } from "react";
import * as styles from "../styles/recom-card.css";
import { getAccessToken, getFavoriteArtist, readArtist } from "@/api";
import { User } from "@/utils";

type Props = {
  contentType: "music" | "book" | "person";
  contentName: string;
  firstImage?: string;
  secondImage?: string;
  thirdImage?: string;
  firstOnClick?: () => void;
  secondOnClick?: () => void;
  thirdOnClick?: () => void;
  manageActive?: boolean;
  user: User | null;
};

const _RecomCard = ({
  contentType,
  contentName,
  firstImage,
  secondImage,
  thirdImage,
  firstOnClick,
  secondOnClick,
  thirdOnClick,
  manageActive,
  user,
}: Props) => {
  const [fImage, setFImage] = useState<string | undefined>(firstImage);
  const [sImage, setSImage] = useState<string | undefined>(secondImage);
  const [tImage, setTImage] = useState<string | undefined>(thirdImage);

  useEffect(() => {
    (async () => {
      const artists = await getFavoriteArtist(user?.user_id || "0");
      const first = artists?.filter((a) => a.rank === 1)[0];
      const second = artists?.filter((a) => a.rank === 2)[0];
      const third = artists?.filter((a) => a.rank === 3)[0];

      const token = await getAccessToken();
      if (first) {
        const sArtist = await readArtist(first.artist, token);
        if (sArtist?.type !== "error") setFImage(sArtist?.value.images[2].url);
      }
      if (second) {
        const sArtist = await readArtist(second.artist, token);
        if (sArtist?.type !== "error") setSImage(sArtist?.value.images[2].url);
      }
      if (third) {
        const sArtist = await readArtist(third.artist, token);
        if (sArtist?.type !== "error") setTImage(sArtist?.value.images[2].url);
      }
    })();
  }, []);

  return (
    <Card>
      <p className={styles.titleStyle}>おすすめの{contentName}　ベスト3</p>
      <div className={styles.itemListStyle}>
        <div onClick={firstOnClick}>
          <Ranking
            contentType={contentType}
            image={firstImage}
            rank={1}
            manageActive={manageActive}
          />
        </div>
        <div onClick={secondOnClick}>
          <Ranking
            contentType={contentType}
            image={secondImage}
            rank={2}
            manageActive={manageActive}
          />
        </div>
        <div onClick={thirdOnClick}>
          <Ranking
            contentType={contentType}
            image={thirdImage}
            rank={3}
            manageActive={manageActive}
          />
        </div>
      </div>
    </Card>
  );
};

export const RecomCard = _RecomCard;
