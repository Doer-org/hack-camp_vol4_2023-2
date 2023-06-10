"use client";
import { getUserByToken } from "@/api";
import { Avatar, BellIcon, Footer, HomeIcon } from "@/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as styles from "../styles/nav-footer.css";

type ActiveIcon = "timeline" | "profile" | "notice" | "other";
type UserInfo = {
  user_id: string;
  img: string;
};

const _NavFooter = () => {
  const [active, setActive] = useState<ActiveIcon>("timeline");
  const [user, setUser] = useState<UserInfo>();
  useEffect(() => {
    (async () => {
      const user = await getUserByToken();
      if (!user) {
        console.log("user is null > レスポンスを確認してください");
      }
      setUser({
        user_id: user?.user_id || "",
        img: user?.image_url || "",
      });
    })();
  }, []);

  const handleTimelineClick = () => setActive("timeline");
  const handleProfileClick = () => setActive("profile");
  const handleNoticeClick = () => setActive("notice");

  return (
    <Footer>
      <nav className={styles.contentStyle}>
        <div className={styles.itemStyle} onClick={handleTimelineClick}>
          <Link
            href={`/timeline`}
            className={styles.linkStyle}
            prefetch={false}
          >
            <HomeIcon fill={active === "timeline"} />
          </Link>
        </div>
        <div className={styles.itemStyle} onClick={handleProfileClick}>
          <Link
            href={`/profile/${user?.user_id}`}
            className={styles.linkStyle}
            prefetch={false}
          >
            <div
              className={
                active === "profile"
                  ? styles.avatarActive
                  : styles.avatarInactive
              }
            >
              <Avatar size="tiny" image={user?.img} />
            </div>
          </Link>
        </div>
        <div className={styles.itemStyle} onClick={handleNoticeClick}>
          <Link
            href={`/notification`}
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
