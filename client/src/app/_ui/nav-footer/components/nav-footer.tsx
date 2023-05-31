import React from "react";
import { Avator, BellIcon, Footer, HomeIcon } from "@/ui";
import * as styles from "../styles/nav-footer.css";

type Props = {
  icon: string;
  active?: "timeline" | "profile" | "notice" | "other";
};

const _NavFooter = ({ icon, active }: Props) => {
  return (
    <Footer>
      <nav className={styles.contentStyle}>
        <HomeIcon fill={active === "timeline"} />
        <div
          className={
            active === "profile" ? styles.avatorActive : styles.avatorInactive
          }
        >
          <Avator size="tiny" image={icon} />
        </div>
        <BellIcon fill={active === "notice"} />
      </nav>
    </Footer>
  );
};

export const NavFooter = _NavFooter;
