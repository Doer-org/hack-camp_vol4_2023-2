"use client";
import React, { useState } from "react";
import { Logo, Hamburger } from "@/ui";
import { CommonHeader, NavMenu } from "../_ui";
import * as styles from "./_styles/timeline.css";

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const navClassList = [styles.navStyle, open && styles.navOpenStyle];

  return (
    <>
      <CommonHeader
        title="タイムライン"
        left={<Logo />}
        right={<Hamburger onClick={handleClick} />}
      />
      <div className={navClassList.join(" ")}>
        <NavMenu />
      </div>
      <div className={styles.containerStyle}>{children}</div>
    </>
  );
}
