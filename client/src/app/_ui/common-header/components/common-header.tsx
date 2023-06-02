import React from "react";
import { Header } from "@/ui";
import * as styles from "../styles/common-header.css";

type Props = {
  title?: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

const _CommonHeader = ({ left, title, right }: Props) => {
  return (
    <Header size="small">
      <div className={styles.contentStyle}>
        {left}
        <h2 className={styles.titleStyle}>{title}</h2>
        {right}
      </div>
    </Header>
  );
};

export const CommonHeader = _CommonHeader;
