import { ComponentProps } from "react";
import * as styles from "../styles/hamburger.css";

type Props = {
  isOpen: boolean;
} & ComponentProps<"div">;

const _Hamburger = ({ isOpen, ...props }: Props) => {
  const barStyle = [styles.barStyle, isOpen && styles.barOpenStyle].join(" ");
  // TODO: buttonタグで実装する / icon button コンポーネントを作成する
  return (
    <div className={styles.wrapperStyle} {...props}>
      <div className={styles.boxStyle}>
        <span className={barStyle}></span>
        <span className={barStyle}></span>
        <span className={barStyle}></span>
      </div>
    </div>
  );
};

export const Hamburger = _Hamburger;
