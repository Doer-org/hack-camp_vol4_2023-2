"use client";
import React, { useState, useEffect } from "react";
import * as styles from "../styles/nav-menu.css";
import Link from "next/link";
import { fetchAuthInfo } from "@/api/auth";

type Me = {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  sub: string;
  sid: string;
};

const _NavMenu = () => {
  const [me, setMe] = useState<Me>();

  useEffect(() => {
    (async () => {
      const authInfo = await fetchAuthInfo();
      const me = authInfo.me;
      setMe(me);
    })();
  }, []);

  return (
    <div className={styles.frameStyle}>
      <ul className={styles.innerStyle}>
        <li className={styles.itemStyle}>
          <Link href={`/profile/${me?.sid}`} className={styles.linkStyle}>
            プロフィール
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link href={`/notification/${me?.sid}`} className={styles.linkStyle}>
            通知
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link
            href={`/profile/follow/${me?.sid}`}
            className={styles.linkStyle}
          >
            フォロー
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link
            href={`/profile/follower/${me?.sid}`}
            className={styles.linkStyle}
          >
            フォロワー
          </Link>
        </li>
        <li className={styles.itemStyle}>
          <Link href={`/bookmark/${me?.sid}`} className={styles.linkStyle}>
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
