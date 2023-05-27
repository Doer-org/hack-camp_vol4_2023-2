import React from "react";
import * as styles from "../styles/hamburger.css";

const _Hamburger = () => {
  return (
    <div className={styles.boxStyle}>
      <span className={styles.barStyle}></span>
      <span className={styles.barStyle}></span>
      <span className={styles.barStyle}></span>
    </div>
  );
};

export const Hamburger = _Hamburger;
