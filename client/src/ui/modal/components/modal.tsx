import React from "react";
import * as styles from "../styles/modal.css";

const _Modal = () => {
  return (
    <div className={styles.frameStyle}>
      <div className={styles.crossWrapperStyle}>
        <div className={styles.crossStyle}>
          <span className={styles.crossBarStyle}></span>
          <span className={styles.crossBarStyle}></span>
        </div>
      </div>
      <div className={styles.contentStyle}></div>
    </div>
  );
};

export const Modal = _Modal;
