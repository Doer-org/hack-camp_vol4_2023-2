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
  manageActive?: boolean;
};

const _RecomCard = ({
  contentType,
  contentName,
  firstImage,
  secondImage,
  thirdImage,
  manageActive,
}: Props) => {
  return (
    <Card>
      <p className={styles.titleStyle}>おすすめの{contentName}　ベスト3</p>
      <div className={styles.itemListStyle}>
        <Ranking
          contentType={contentType}
          image={firstImage}
          rank={1}
          manageActive={manageActive}
        />
        <Ranking
          contentType={contentType}
          image={secondImage}
          rank={2}
          manageActive={manageActive}
        />
        <Ranking
          contentType={contentType}
          image={thirdImage}
          rank={3}
          manageActive={manageActive}
        />
      </div>
    </Card>
  );
};

export const RecomCard = _RecomCard;
