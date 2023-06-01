import React from "react";
import * as styles from "../styles/nav-menu.css";
import Link from "next/link";

const _NavMenu = () => {
  return (
    <div className={styles.frameStyle}>
      <ul className={styles.innerStyle}>
        <li className={styles.itemStyle}>
          <Link href="" className={styles.linkStyle}>
            プロフィール
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link href="" className={styles.linkStyle}>
            通知
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link href="" className={styles.linkStyle}>
            フォロー
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link href="" className={styles.linkStyle}>
            フォロワー
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link href="" className={styles.linkStyle}>
            いいねしたプロフィール
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link href="" className={styles.linkStyle}>
            ログアウト
          </Link>
        </li>
      </ul>
    </div>
  );
};

export const NavMenu = _NavMenu;
