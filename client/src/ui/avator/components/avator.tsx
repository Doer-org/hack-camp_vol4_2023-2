import React from "react";
import * as styles from "../styles/avator.css";

type Props = {
  image?: string;
  size: "tiny" | "small" | "medium" | "large";
  onClick?: () => void;
};

const _Avator = ({ size, image, ...props }: Props) => {
  return (
    <div
      className={[styles.size[size], styles.wrapperStyle].join(" ")}
      {...props}
    >
      <img className={styles.imageStyle} src={image} alt="アバター" />
    </div>
  );
};

export const Avator = _Avator;
