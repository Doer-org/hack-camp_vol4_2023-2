import { Button, Header, Logo } from "@/ui";
import Link from "next/link";
import * as styles from "../styles/top-header.css";

const _TopHeader = () => {
  return (
    <Header>
      <div className={styles.contentStyle}>
        <div className={styles.leftStyle}>
          <Logo />
          <h1 className={styles.titleStyle}>トモシル</h1>
        </div>
        <Link href="/timeline" className={styles.linkStyle} prefetch={false}>
          <Button color="black">Log in</Button>
        </Link>
      </div>
    </Header>
  );
};

export const TopHeader = _TopHeader;
