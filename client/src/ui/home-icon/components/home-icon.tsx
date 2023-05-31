import React from "react";
import * as styles from "../styles/home-icon.css";

type Props = {
  fill?: boolean;
  onClick?: () => void;
};

const _HomeIcon = ({ fill = false, ...props }: Props) => {
  return (
    <div className={styles.wrapperStyle} {...props}>
      <img
        className={styles.imageStyle}
        src={fill ? "/assets/home-fill.svg" : "/assets/home-line.svg"}
        alt="ホーム"
      />
    </div>
  );
};

export const HomeIcon = _HomeIcon;
