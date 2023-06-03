import React from "react";
import * as styles from "../styles/sns-icon.css";

type Props = {
  sns: "github" | "twitter" | "doer";
};

const _SnsIcon = ({ sns }: Props) => {
  return (
    <div className={styles.wrapperStyle}>
      <img src={`assets/${sns}.png`} alt={sns} className={styles.iconStyle} />
    </div>
  );
};

export const SnsIcon = _SnsIcon;
