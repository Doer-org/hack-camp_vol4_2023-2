"use client";
import { getFollows, getUser } from "@/api";
import { CommonHeader } from "@/app/_ui";
import { Arrow, Avatar, Card, Logo } from "@/ui";
import { User } from "@/utils";
import React, { useEffect, useState } from "react";
import * as commonStyles from "../../../_styles/common.css";
import { FollowButton } from "../../../_ui";
import * as styles from "../_styles/follow.css";

type Props = {
  params: { id: string };
};

const guest: User extends { data: infer U } ? U : never = {
  user_id: "guest",
  user_name: "Guest",
  image_url: "",
};

const Page = ({ params }: Props) => {
  const [followDOM, setFollowDOM] = useState<React.ReactNode[]>();

  useEffect(() => {
    (async () => {
      const follows = await getFollows(params.id);
      const user = await getUser(params.id);
      const fDOM: React.ReactNode[] = [];
      follows?.forEach(async (f) => {
        fDOM.push(
          <div key={f.user_id} className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardStyle}>
                <div className={styles.cardUserStyle}>
                  <Avatar size="small" image={f?.image_url} />
                  <span className={styles.cardUserNameStyle}>
                    {f?.user_name}
                  </span>
                </div>
                <FollowButton
                  user_from={user || guest}
                  user_to={f}
                  followType="follow"
                  following={true}
                />
              </div>
            </Card>
          </div>
        );
        setFollowDOM(fDOM);
      });
    })();
  }, []);

  return (
    <>
      <CommonHeader title="フォロー" left={<Arrow />} right={<Logo />} />
      <div
        className={[
          commonStyles.containerStyle,
          commonStyles.headerAvoidStyle["common"],
        ].join(" ")}
      >
        <div className={commonStyles.contentStyle}>
          <div className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardStyle}>
                <div className={styles.cardUserStyle}>
                  <Avatar
                    size="small"
                    image={
                      "https://avatars.githubusercontent.com/u/55625375?v=4"
                    }
                  />
                  <span className={styles.cardUserNameStyle}>Aoki</span>
                </div>
                <FollowButton
                  user_from={guest}
                  user_to={guest}
                  followType="follow"
                  following={true}
                />
              </div>
            </Card>
          </div>
          <div className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardStyle}>
                <div className={styles.cardUserStyle}>
                  <Avatar
                    size="small"
                    image={
                      "https://avatars.githubusercontent.com/u/55625375?v=4"
                    }
                  />
                  <span className={styles.cardUserNameStyle}>YUGA</span>
                </div>
                <FollowButton
                  user_from={guest}
                  user_to={guest}
                  followType="follow"
                  following={true}
                />
              </div>
            </Card>
          </div>
          {followDOM}
        </div>
      </div>
    </>
  );
};

export default Page;
