import { env } from "@/utils/env";
import { TopHeader } from "./_ui";
import * as styles from "./_styles/top.css";
import { Button, Logo } from "@/ui";

export default function Home() {
  const { clientURL } = env();
  return (
    <>
      <TopHeader />
      <main className={styles.wrapperStyle}>
        <div className={styles.contentStyle}>
          <div className={styles.catchphraseArea}>
            <div className={styles.logo}>
              <Logo size="large" />
            </div>
            <h2 className={styles.catchphrase}>
              友達の趣味を
              <br />
              一目で知る
            </h2>
          </div>
          <p className={styles.description}>
            「トモシル」は、
            <span className={styles.textPink}>&quot;友&quot;</span>
            達の好きなものを、
            <br />
            簡単に<span className={styles.textPink}>&quot;知る&quot;</span>
            ことができるサービスです。
            <br />
            友人の新たな一面が見つかるかもしれません。
          </p>
          <div className={styles.centering}>
            <Button color="pink">始める</Button>
          </div>
        </div>
        <div className={styles.contentStyle}>
          <h3 className={styles.sectionTitle}>
            あなただけのオリジナルの
            <br />
            プロフィールを作成
          </h3>
        </div>
      </main>
    </>
  );
}
