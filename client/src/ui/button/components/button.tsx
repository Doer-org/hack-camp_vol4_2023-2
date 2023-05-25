import React from "react";
import * as styles from "../styles/button.css";

type Props = {
  color: "black" | "gray" | "pink";
  label: string;
  onClick?: () => void;
};

export const _Button = ({ color, label, ...props }: Props) => {
  return (
    <button
      type="button"
      className={[styles.background[color], styles.contentStyle].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};

export const Button = _Button;
