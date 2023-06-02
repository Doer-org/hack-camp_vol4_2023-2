import { Card } from "@/ui";
import React from "react";
import * as styles from "../styles/recom-card.css";

const _RecomCard = () => {
  return (
    <Card>
      <p className={styles.titleStyle}>おすすめの曲</p>
      <div className={styles.itemListStyle}>
        <div
          style={{
            width: "90px",
            height: "90px",
          }}
        ></div>
        <div
          style={{
            width: "90px",
            height: "90px",
          }}
        ></div>
        <div
          style={{
            width: "90px",
            height: "90px",
          }}
        ></div>
      </div>
    </Card>
  );
};

export const RecomCard = _RecomCard;
