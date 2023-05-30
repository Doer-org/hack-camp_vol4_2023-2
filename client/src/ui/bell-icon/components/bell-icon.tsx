import React from "react";
import * as styles from "../styles/bell-icon.css";

type Props = {
  fill: boolean;
  onClick?: () => void;
};

const _BellIcon = ({ fill }: Props) => {
  return (
    <div className={styles.wrapperStyle}>
      <img
        className={styles.imageStyle}
        src={fill ? "/assets/bell-fill.png" : "/assets/bell-line.png"}
        alt="ベル"
      />
    </div>
  );
};

export const BellIcon = _BellIcon;
