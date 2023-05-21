import React from "react";
import * as styles from "../styles/button.css";

type Props = {
  variant: "black" | "gray" | "pink";
  label: string;
  onClick?: () => void;
};

export const Button = ({ variant, label, ...props }: Props) => {
  return (
    <button
      type="button"
      className={[
        styles.background[variant],
        styles.contentStyle,
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};
