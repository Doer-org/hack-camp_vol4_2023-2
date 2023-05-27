import React from "react";
import * as styles from "../styles/button.css";

type Props = {
  color: "black" | "gray" | "pink";
  children: React.ReactNode;
  onClick?: () => void;
};

export const _Button = ({ color, children, ...props }: Props) => {
  return (
    <button
      type="button"
      className={[styles.background[color], styles.contentStyle].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export const Button = _Button;
