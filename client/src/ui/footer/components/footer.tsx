import React, { Children } from "react";
import * as styles from "../styles/footer.css";

type Props = {
  children: React.ReactNode;
};

const _Footer = ({ children }: Props) => (
  <footer className={styles.footerStyle}>{children}</footer>
);

export const Footer = _Footer;
