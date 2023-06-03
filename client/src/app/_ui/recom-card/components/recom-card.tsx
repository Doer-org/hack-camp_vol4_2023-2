"use client";
import { Card } from "@/ui";
import { Ranking } from "@/ui/ranking/components";
import React, { useEffect } from "react";
import * as styles from "../styles/recom-card.css";
import { getFavoriteArtist } from "@/api";
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
  useEffect(() => {
    (async () => {
      const artists = await getFavoriteArtist(user?.user_id || "0");
      const first = artists?.filter((a) => a.rank === 1)[0];
      const second = artists?.filter((a) => a.rank === 2)[0];
      const third = artists?.filter((a) => a.rank === 3)[0];
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
