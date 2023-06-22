/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Logo, MemberCard, SnsIcon } from "@/ui";
import Link from "next/link";
import * as styles from "../_styles/top.css";
import { TopHeader } from "../_ui";

export default function Home() {
  return (
    <>
      <TopHeader />
      <main className={styles.wrapperStyle}>
        <section className={styles.contentStyle}>
          <div className={styles.catchphraseArea}>
            <div className={styles.logo}>
              <Logo link={false} size="large" />
            </div>
            <h2 className={styles.catchphrase}>
              友達の趣味を
              <br className={styles.brNone} />
              一目で知る
            </h2>
          </div>
          <p className={styles.description}>
            「トモシル」は、
            <span className={styles.textPink}>&quot;友&quot;</span>
            達の好きなものを、
            <br className={styles.brNone} />
            簡単に<span className={styles.textPink}>&quot;知る&quot;</span>
            ことができるサービスです。
            <br />
            友人の新たな一面が見つかるかもしれません。
          </p>
          <div className={styles.centering}>
            <Link
              href="/timeline"
              className={styles.linkStyle}
              prefetch={false}
            >
              <Button color="pink">始める</Button>
            </Link>
          </div>
        </section>
        <section className={[styles.contentStyle, styles.bgBeige].join(" ")}>
          <h3 className={styles.sectionTitle}>
            あなただけのオリジナルの
            <br />
            プロフィールを作成
          </h3>
          <div className={styles.introduction}>
            <img
              className={styles.introductionImage}
              src="assets/myprofile.png"
              alt="プロフィールページ"
            />
            <p className={styles.introductionText}>
              アカウント登録後、あなただけのオリジナルのプロフィールを作成することができます。
              <br />
              音楽や本など、自分の好きなジャンルにおけるベスト3を紹介しましょう！
            </p>
          </div>
        </section>
        <section className={styles.contentStyle}>
          <h3 className={styles.sectionTitle}>
            友達のプロフィールに
            <br />
            フォローやいいねができる
          </h3>
          <div className={styles.introduction}>
            <p className={styles.introductionText}>
              友達のプロフィールを見て、面白い！いいね！と思ったら、フォローやいいねをすることができます。
              <br />
              積極的にいいねして友達との交流を深めましょう！
            </p>
            <img
              className={styles.introductionImage}
              src="assets/othersprofile.png"
              alt="プロフィールページ"
            />
          </div>
        </section>
        <section className={[styles.contentStyle, styles.bgBeige].join(" ")}>
          <h3 className={styles.sectionTitle}>
            プロフィールの変更は
            <br />
            タイムラインから確認
          </h3>
          <div className={styles.introduction}>
            <img
              className={styles.introductionImage}
              src="assets/timeline.png"
              alt="タイムラインページ"
            />
            <p className={styles.introductionText}>
              フォローしたユーザーのプロフィールが更新されたときは、タイムラインから確認することができます。
              <br />
              友達の好みの変化も、いち早く確認しましょう！
            </p>
          </div>
        </section>
        <section className={[styles.contentStyle, styles.bgPink].join(" ")}>
          <h3 className={styles.sectionTitle}>Creators</h3>
          <div className={styles.creators}>
            <MemberCard
              icon="https://avatars.githubusercontent.com/u/55625375?v=4"
              name="Aoki"
              role="Backend/ Infra"
              github="RyushiAok"
            />
            <MemberCard
              icon="https://avatars.githubusercontent.com/u/134787738?s=60&v=4"
              name="Ayano"
              role="Backend/ Frontend"
              github="mashumarrow"
              twitter="A61935791"
            />
            <MemberCard
              icon="https://avatars.githubusercontent.com/u/86759515?v=4"
              name="yasuda"
              role="Frontend"
              github="yach36"
              twitter="Quarter_st"
            />
            <MemberCard
              icon="https://avatars.githubusercontent.com/u/134147341?s=60&v=4"
              name="Saki"
              role="Frontend"
              github="Saki-299"
            />
            <MemberCard
              icon="https://avatars.githubusercontent.com/u/113420384?v=4"
              name="yuga"
              role="Frontend/ Design"
              github="yuuugaaa"
              twitter="____yuuugaaa"
            />
          </div>
        </section>
        <section className={[styles.contentStyle, styles.doer].join(" ")}>
          <img
            className={styles.doerImage}
            src="https://images-ext-2.discordapp.net/external/qtfcHSSS-dP6AuQM5RKS5QFHCPsPyFtU5TqRAifP8AE/https/doer.vercel.app/og_img.png"
            alt="Do'er"
          />
          <p className={styles.doerCatchphrase}>
            同志社大学・同志社女子大学
            <br />
            エンジニアのためのコミュニティ
          </p>
          <p className={styles.doerDescription}>
            Do&apos;erは同志社大学・同志社女子大学の学生が所属するエンジニアサークルです。
            <br />
            技術のキャッチアップだけでなく、ハッカソン出場やチームメンバーの育成などキャリアに繋げられる活動を行っています。
          </p>
          <div className={styles.doerSns}>
            <a
              href="https://github.com/Doer-org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SnsIcon sns="github" />
            </a>
            <a
              href="https://twitter.com/du_doer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SnsIcon sns="twitter" />
            </a>
            <a
              href="https://doer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SnsIcon sns="doer" />
            </a>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerText}>TomoShiru</p>
      </footer>
    </>
  );
}
