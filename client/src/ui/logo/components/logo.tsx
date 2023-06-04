import React from "react";
import * as styles from "../styles/logo.css";
import Link from "next/link";

type Props = {
  link?: boolean;
  size?: "small" | "large";
  onClick?: () => void;
};

const _Logo = ({ link = true, size = "small", ...props }: Props) => {
  return (
    <div
      className={[styles.size[size], styles.wrapperStyle].join(" ")}
      {...props}
    >
      {link ? (
        <Link href="/" className={styles.linkStyle} prefetch={false}>
          <img
            className={styles.imageStyle}
            src="/assets/logo.png"
            alt="ロゴ"
          />
        </Link>
      ) : (
        <img className={styles.imageStyle} src="/assets/logo.png" alt="ロゴ" />
      )}
    </div>
  );
};

export const Logo = _Logo;
