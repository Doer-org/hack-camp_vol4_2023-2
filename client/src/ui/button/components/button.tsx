import React from "react";
import * as styles from "../styles/button.css";

type Props = {
  color: "black" | "gray" | "pink";
  size?: "small" | "medium";
  children: React.ReactNode;
  onClick?: () => void;
};

const _Button = ({ color, children, size, ...props }: Props) => {
  return (
    <button
      type="button"
      className={[
        styles.contentStyle,
        styles.background[color],
        size && styles.size[size],
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export const Button = _Button;
