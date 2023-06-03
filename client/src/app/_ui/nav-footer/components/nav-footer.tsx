"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Avator, BellIcon, Footer, HomeIcon } from "@/ui";
import * as styles from "../styles/nav-footer.css";
import { User } from "@/utils";

type Props = {
  user: User | null;
};

const _NavFooter = ({ user }: Props) => {
  type activeType = "timeline" | "profile" | "notice" | "other";
  const [active, setActive] = useState<activeType>("timeline");

  const handleTimelineClick = () => setActive("timeline");
  const handleProfileClick = () => setActive("profile");
  const handleNoticeClick = () => setActive("notice");

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
              <Avator size="tiny" image={user?.image_url} />
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
