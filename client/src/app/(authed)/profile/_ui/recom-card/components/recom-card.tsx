"use client";
import { Card } from "@/ui";
import { Ranking } from "@/ui/ranking/components";
import React from "react";
import * as styles from "../styles/recom-card.css";

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
}: Props) => {
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
