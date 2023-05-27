import React from "react";
import * as styles from "../styles/logo.css";

type Props = {
  // 現状smallのみ
  size?: "small";
  onClick?: () => void;
};

const _Logo = ({ size = "small", ...props }: Props) => {
  return (
    <div
      className={[styles.size[size], styles.wrapperStyle].join(" ")}
      {...props}
    >
      <img
        className={styles.imageStyle}
        src="https://user-images.githubusercontent.com/86759515/241351124-91eb9055-3665-46cd-bc82-515907b55e5d.png"
        alt="ロゴ"
      />
    </div>
  );
};

export const Logo = _Logo;
