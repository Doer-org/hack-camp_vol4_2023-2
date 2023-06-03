import { Noto_Sans_JP } from "next/font/google";
import { NavFooter } from "./_ui";
import * as styles from "./_styles/global.css";

const notoSansJP = Noto_Sans_JP({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: false,
});

export const metadata = {
  title: "トモシル",
  description:
    '「トモシル」は、"友"達の好きなものを、簡単に"知る"ことができるサービスです。友人の新たな一面が見つかるかもしれません。',
};

const me = {
  id: 100,
  icon: "https://avatars.githubusercontent.com/u/55625375?v=4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={[styles.resetStyle, notoSansJP.className].join(" ")}>
        <div className={styles.baseStyle}>{children}</div>
        <NavFooter user={me} />
      </body>
    </html>
  );
}
