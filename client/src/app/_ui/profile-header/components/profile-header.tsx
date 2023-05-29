import React from "react";
import * as styles from "../styles/profile-header.css";
import { Avator, Button, Header, Logo } from "@/ui";

type User = {
  name: string;
  icon: string;
  me: boolean;
};

type Props = {
  user?: User;
};

const _ProfileHeader = ({ user }: Props) => {
  return (
    <Header>
      {user && (
        <div className={styles.contentStyle}>
          <div className={styles.profileStyle}>
            <Avator size="medium" image={user.icon} />
            <span>{user.name}</span>
          </div>
          {user.me ? (
            <Button className={styles.buttonStyle} color="black">
              編集
            </Button>
          ) : (
            <Logo />
          )}
        </div>
      )}
    </Header>
  );
};

export const ProfileHeader = _ProfileHeader;
