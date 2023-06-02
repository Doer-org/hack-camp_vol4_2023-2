import React from "react";
import { Button, Header, Logo } from "@/ui";
import * as styles from "../styles/top-header.css";

const _TopHeader = () => {
  return (
    <Header>
      <div className={styles.contentStyle}>
        <div className={styles.leftStyle}>
          <Logo />
          <h1 className={styles.titleStyle}>トモシル</h1>
        </div>
        <Button color="black">Log in</Button>
      </div>
    </Header>
  );
};

export const TopHeader = _TopHeader;
