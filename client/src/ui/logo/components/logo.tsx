import React from "react";
import * as styles from "../styles/logo.css";
import Link from "next/link";

type Props = {
  size?: "small" | "large";
  onClick?: () => void;
};

const _Logo = ({ size = "small", ...props }: Props) => {
  return (
    <div
      className={[styles.size[size], styles.wrapperStyle].join(" ")}
      {...props}
    >
      <Link href="/">
        <img className={styles.imageStyle} src="/assets/logo.png" alt="ロゴ" />
      </Link>
    </div>
  );
};

export const Logo = _Logo;
