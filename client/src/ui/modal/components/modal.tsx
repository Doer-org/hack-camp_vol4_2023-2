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
      <div className={styles.contentStyle}>
        <div className={styles.buttonStyle}>
          <img
            className={styles.buttonImageStyle}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          />
          <span className={styles.buttonTextStyle}>GitHubでログイン</span>
        </div>
        <p className={styles.contentTextStyle}>
          アカウントをお持ちでない方は
          <a href="#" className={styles.contentTextLinkStyle}>
            こちら
          </a>
        </p>
      </div>
    </div>
  );
};

export const Modal = _Modal;
