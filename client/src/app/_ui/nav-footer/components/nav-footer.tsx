"use client";
import React, { useState } from "react";
import { Avator, BellIcon, Footer, HomeIcon } from "@/ui";
import * as styles from "../styles/nav-footer.css";

type User = {
  id: number;
  icon: string;
};

type Props = {
  user: User;
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
          <HomeIcon fill={active === "timeline"} />
        </div>
        <div className={styles.itemStyle} onClick={handleProfileClick}>
          <div
            className={
              active === "profile" ? styles.avatorActive : styles.avatorInactive
            }
          >
            <Avator size="tiny" image={user.icon} />
          </div>
        </div>
        <div className={styles.itemStyle} onClick={handleNoticeClick}>
          <BellIcon fill={active === "notice"} />
        </div>
      </nav>
    </Footer>
  );
};

export const NavFooter = _NavFooter;
