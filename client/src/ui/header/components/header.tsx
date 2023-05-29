import React from "react";
import * as styles from "../styles/header.css";

type Props = {
  children: React.ReactNode;
};

const _Header = ({ children }: Props) => (
  <header className={styles.headerStyle}>{children}</header>
);

export const Header = _Header;
