"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Avator, BellIcon, Footer, HomeIcon } from "@/ui";
import * as styles from "../styles/nav-footer.css";
import { fetchAuthInfo } from "@/api/auth";

type Me = {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  sub: string;
  sid: string;
};

const _NavFooter = () => {
  type activeType = "timeline" | "profile" | "notice" | "other";
  const [active, setActive] = useState<activeType>("timeline");
  const [me, setMe] = useState<Me>();

  const handleTimelineClick = () => setActive("timeline");
  const handleProfileClick = () => setActive("profile");
  const handleNoticeClick = () => setActive("notice");

  useEffect(() => {
    (async () => {
      const authInfo = await fetchAuthInfo();
      const me = authInfo.me;
      console.log(me);
      setMe(me);
    })();
  }, []);

  return (
    <Footer>
      <nav className={styles.contentStyle}>
        <div className={styles.itemStyle} onClick={handleTimelineClick}>
          <Link href="/timeline" className={styles.linkStyle} prefetch={false}>
            <HomeIcon fill={active === "timeline"} />
          </Link>
        </div>
        <div className={styles.itemStyle} onClick={handleProfileClick}>
          <Link href="/profile" className={styles.linkStyle} prefetch={false}>
            <div
              className={
                active === "profile"
                  ? styles.avatorActive
                  : styles.avatorInactive
              }
            >
              <Avator size="tiny" image={me?.picture} />
            </div>
          </Link>
        </div>
        <div className={styles.itemStyle} onClick={handleNoticeClick}>
          <Link
            href="/notification"
            className={styles.linkStyle}
            prefetch={false}
          >
            <BellIcon fill={active === "notice"} />
          </Link>
        </div>
      </nav>
    </Footer>
  );
};

export const NavFooter = _NavFooter;
