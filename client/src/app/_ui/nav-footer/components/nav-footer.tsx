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
  active?: "timeline" | "profile" | "notice" | "other";
};

const _NavFooter = ({ user, active }: Props) => {
  const [activeState, setActiveState] = useState<Props["active"]>(active);

  const handleTimelineClick = () => setActiveState("timeline");
  const handleProfileClick = () => setActiveState("profile");
  const handleNoticeClick = () => setActiveState("notice");

  return (
    <Footer>
      <nav className={styles.contentStyle}>
        <div>
          <HomeIcon
            fill={activeState === "timeline"}
            onClick={handleTimelineClick}
          />
        </div>
        <div>
          <div
            className={
              activeState === "profile"
                ? styles.avatorActive
                : styles.avatorInactive
            }
            onClick={handleProfileClick}
          >
            <Avator size="tiny" image={user.icon} />
          </div>
        </div>
        <div>
          <BellIcon
            fill={activeState === "notice"}
            onClick={handleNoticeClick}
          />
        </div>
      </nav>
    </Footer>
  );
};

export const NavFooter = _NavFooter;
