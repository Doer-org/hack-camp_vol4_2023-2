"use client";
import React, { useEffect, useState } from "react";
import { Arrow, Logo, Card, Avator } from "@/ui";
import { CommonHeader } from "@/app/_ui";
import * as commonStyles from "../../../_styles/common.css";
import * as styles from "../_styles/follower.css";
import { getFollowers, getFollows, getUser } from "@/api";
import { User } from "@/utils";
import { FollowButton } from "../../../_ui";

type Props = {
  params: { id: string };
};

const guest: User = {
  user_id: "guest",
  user_name: "Guest",
  image_url: "",
};

const Page = ({ params }: Props) => {
  const [followerDOM, setFollowerDOM] = useState<React.ReactNode[]>();

  useEffect(() => {
    (async () => {
      const followers = await getFollowers(params.id);
      const follows = await getFollows(params.id);
      const user = await getUser(params.id);
      const fDOM: React.ReactNode[] = [];
      followers?.forEach(async (f) => {
        let following = false;
        const jouken = follows?.filter((ff) => ff.user_id === f.user_id);
        if (jouken !== undefined && jouken.length > 0) {
          following = true;
        }

        fDOM.push(
          <div key={f.user_id} className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardStyle}>
                <div className={styles.cardUserStyle}>
                  <Avator size="small" image={f?.image_url} />
                  <span className={styles.cardUserNameStyle}>
                    {f?.user_name}
                  </span>
                </div>
                <FollowButton
                  user_from={user || guest}
                  user_to={f}
                  followType="follower"
                  following={following}
                />
              </div>
            </Card>
          </div>
        );
        setFollowerDOM(fDOM);
      });
    })();
  }, []);

  return (
    <>
      <CommonHeader title="フォロワー" left={<Arrow />} right={<Logo />} />
      <div
        className={[
          commonStyles.containerStyle,
          commonStyles.headerAvoidStyle["common"],
        ].join(" ")}
      >
        <div className={commonStyles.contentStyle}>{followerDOM}</div>
      </div>
    </>
  );
};

export default Page;
