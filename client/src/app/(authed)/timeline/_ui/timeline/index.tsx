import { Avatar, Card } from "@/ui";
import * as commonStyles from "../../../_styles/common.css";
import * as styles from "../../_styles/timeline.css";

type Props = {};

const _Timeline = (props: Props) => {
  // const user = await getUserByToken();
  // const timeline = await getTimeLine(user?.user_id || "");
  // useEffect(() => {
  //   (async () => {
  //     const tlDOM: React.ReactNode[] = [];
  //     timeline?.forEach(async (tl) => {
  //       const user = await getUser(tl.user_id);
  //       tlDOM.push(
  //         <div className={styles.cardWrapperStyle}>
  //           <Card>
  //             <div className={styles.cardInnerStyle}>
  //               <Avatar image={user?.image_url} size="small" />
  //               <p className={styles.actionStyle}>
  //                 <span className={styles.userNameStyle}>
  //                   {user?.user_name}
  //                 </span>
  //                 さんが{tl.summary}
  //               </p>
  //             </div>
  //           </Card>
  //         </div>
  //       );
  //     });
  //     setTimelineDOM(tlDOM);
  //   })();
  // }, []);
  return (
    <>
      <div
        className={[
          commonStyles.containerStyle,
          commonStyles.headerAvoidStyle["common"],
        ].join(" ")}
      >
        <div className={commonStyles.contentStyle}>
          {/* {timelineDOM} */}
          <div className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardInnerStyle}>
                <Avatar
                  image={
                    "https://avatars.githubusercontent.com/u/55625375?s=64&v=4"
                  }
                  size="small"
                />
                <p className={styles.actionStyle}>
                  <span className={styles.userNameStyle}>Aoki</span>
                  さんが音楽プロフィールの内容を変更しました！
                </p>
              </div>
            </Card>
          </div>
          <div className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardInnerStyle}>
                <Avatar
                  image={
                    "https://avatars.githubusercontent.com/u/134147341?s=64&v=4"
                  }
                  size="small"
                />
                <p className={styles.actionStyle}>
                  <span className={styles.userNameStyle}>さき</span>
                  さんが本プロフィールの内容を変更しました！
                </p>
              </div>
            </Card>
          </div>
          <div className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardInnerStyle}>
                <Avatar
                  image={
                    "https://avatars.githubusercontent.com/u/113420384?s=64&v=4"
                  }
                  size="small"
                />
                <p className={styles.actionStyle}>
                  <span className={styles.userNameStyle}>yuga</span>
                  さんが新しく本プロフィールを作成しました！
                </p>
              </div>
            </Card>
          </div>
          <div className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardInnerStyle}>
                <Avatar
                  image={
                    "https://avatars.githubusercontent.com/u/134787738?s=60&v=4"
                  }
                  size="small"
                />
                <p className={styles.actionStyle}>
                  <span className={styles.userNameStyle}>Ayano</span>
                  さんが新しく本プロフィールを作成しました！
                </p>
              </div>
            </Card>
          </div>
          <div className={styles.cardWrapperStyle}>
            <Card>
              <div className={styles.cardInnerStyle}>
                <Avatar
                  image={"https://avatars.githubusercontent.com/u/86759515?v=4"}
                  size="small"
                />
                <p className={styles.actionStyle}>
                  <span className={styles.userNameStyle}>Yasuda</span>
                  さんが新しく音楽プロフィールを作成しました！
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export const Timeline = _Timeline;
