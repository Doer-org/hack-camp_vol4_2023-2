"use client";
import Link from "next/link";
import * as styles from "../styles/nav-menu.css";

type Props = {
  user_id: string;
  isOpen: boolean;
};

const _NavMenu = ({ user_id, isOpen = false }: Props) => {
  const navClassList = [
    styles.navStyle,
    styles.headerAvoidStyle["common"],
    // isOpen && styles.navOpenStyle,
  ];
  return (
    // <div className={navClassList.join(" ")}>
    <div
      className={styles.frameStyle}
      style={{
        display: !isOpen ? "none" : undefined,
      }}
    >
      <ul className={styles.innerStyle}>
        <li className={styles.itemStyle}>
          <Link href={`/profile/${user_id}`} className={styles.linkStyle}>
            プロフィール
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link href={`/notification/${user_id}`} className={styles.linkStyle}>
            通知
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link
            href={`/profile/follow/${user_id}`}
            className={styles.linkStyle}
          >
            フォロー
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link
            href={`/profile/follower/${user_id}`}
            className={styles.linkStyle}
          >
            フォロワー
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link href={`/bookmark/${user_id}`} className={styles.linkStyle}>
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
    // </div>
  );
};

export const NavMenu = _NavMenu;
