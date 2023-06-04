import React from "react";
import { Button, Header, Logo } from "@/ui";
import * as styles from "../styles/top-header.css";
import Link from "next/link";

const _TopHeader = () => {
  return (
    <Header>
      <div className={styles.contentStyle}>
        <div className={styles.leftStyle}>
          <Logo />
          <h1 className={styles.titleStyle}>トモシル</h1>
        </div>
        <Link href="/timeline/1" className={styles.linkStyle} prefetch={false}>
          <Button color="black">Log in</Button>
        </Link>
      </div>
    </Header>
  );
};

export const TopHeader = _TopHeader;
