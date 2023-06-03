"use client";
import { Arrow, Logo, Card, Avator, Button } from "@/ui";
import { CommonHeader } from "@/app/_ui";
import * as styles from "../_styles/follow.css";

const Page = () => {
  return (
    <>
      <CommonHeader title="フォロー" left={<Arrow />} right={<Logo />} />
      <div className={styles.containerStyle}>
        <div className={styles.contentStyle}>
          <Card>
            <div className={styles.cardStyle}>
              <div className={styles.cardUserStyle}>
                <Avator
                  size="small"
                  image="https://avatars.githubusercontent.com/u/55625375?s=64&v=4"
                />
                <span>Aoki</span>
              </div>
              <Button color="black" size="small">
                フォロー中
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
