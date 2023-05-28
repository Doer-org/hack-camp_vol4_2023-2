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
      <img className={styles.imageStyle} src="/assets/logo.png" alt="ロゴ" />
    </div>
  );
};

export const Logo = _Logo;
