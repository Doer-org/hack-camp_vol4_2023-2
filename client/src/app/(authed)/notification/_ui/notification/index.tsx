const kind2ja = new Map([["like", "いいね！"]]);
const _Notification = () => {
  // const [notificationDOM, setNotificationDOM] = useState<React.ReactNode[]>();

  // useEffect(() => {
  //   (async () => {
  //     const reactions = await getReaction(params.id);
  //     const notifications = reactions?.filter(
  //       (r) => r.user_id_to === params.id
  //     );
  //     const nDOM: React.ReactNode[] = [];
  //     notifications?.forEach(async (n) => {
  //       const user = await getUser(n.user_id_from);
  //       nDOM.push(
  //         <div
  //           key={n.user_id_from + n.timestamp}
  //           className={styles.noticeStyle}
  //         >
  //           {user && <NoticeCard user={user} action={kind2ja.get(n.kind)} />}
  //         </div>
  //       );
  //     });
  //     setNotificationDOM(nDOM);
  //   })();
  // }, []);
  // return <div>{notificationDOM}</div>;
  return <>通知</>;
};

export const Notification = _Notification;
