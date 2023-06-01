import React from "react";
import { CommonHeader } from "@/app/_ui";
import { Arrow, Button } from "@/ui";
import * as styles from "./_styles/search.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CommonHeader
        left={<Arrow />}
        right={
          <Button color="black" size="small">
            完了
          </Button>
        }
        title="おすすめの曲"
      />
      <div className={styles.containerStyle}>{children}</div>
    </>
  );
};

export default Layout;
