import React from "react";
import { Avator, Card, SnsIcon } from "@/ui";
import * as styles from "../styles/member-card.css";

type Props = {
  icon: string;
  name: string;
  role: string;
  github?: string;
  twitter?: string;
};

const _MemberCard = ({ icon, name, role, github, twitter }: Props) => {
  return (
    <Card>
      <div className={styles.contentStyle}>
        <div>
          <div className={styles.iconStyle}>
            <Avator image={icon} size="large" />
          </div>
          <p className={styles.nameStyle}>{name}</p>
          <p className={styles.roleStyle}>{role}</p>
          <div className={styles.snsArea}>
            {github !== undefined && (
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SnsIcon sns="github" />
              </a>
            )}
            {twitter !== undefined && (
              <a
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SnsIcon sns="twitter" />
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export const MemberCard = _MemberCard;
