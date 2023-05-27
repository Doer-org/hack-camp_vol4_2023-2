import React from "react";
import * as styles from "../styles/card.css";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const _Card = ({ children }: Props) => {
  return <div className={styles.frameStyle}>{children}</div>;
};

export const Card = _Card;
