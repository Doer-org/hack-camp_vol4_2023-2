import React from "react";
import * as styles from "../styles/header.css";

type Props = {
  size?: "small";
  children: React.ReactNode;
};

const _Header = ({ size, children }: Props) => (
  <header className={[styles.headerStyle, size && styles.size[size]].join(" ")}>
    {children}
  </header>
);

export const Header = _Header;
