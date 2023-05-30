import React from "react";
import * as styles from "../styles/home-icon.css";

type Props = {
  fill: boolean;
  onClick?: () => void;
};

const _HomeIcon = ({ fill }: Props) => {
  return (
    <div className={styles.wrapperStyle}>
      <img
        className={styles.imageStyle}
        src={fill ? "/assets/home-fill.png" : "/assets/home-line.png"}
        alt="ロゴ"
      />
    </div>
  );
};

export const HomeIcon = _HomeIcon;
