import React from "react";
import * as styles from "../styles/label.css";

type Props = {
  color?: "pink";
  string?: string;
};

export const _Label = ({ color = "pink", string = "新規" }: Props) => {
  return <p className={styles.labelStyle[color]}>{string}</p>;
};

export const Label = _Label;
