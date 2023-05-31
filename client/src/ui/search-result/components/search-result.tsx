import React from "react";
import * as styles from "../styles/search-result.css";

type Props = {
  image: string;
  text: string;
  contentType: "music" | "book" | "person";
  onClick?: () => void;
};

const _SearchResult = ({ image, text, contentType, ...props }: Props) => {
  return (
    <div className={styles.wrapperStyle} {...props}>
      <div className={styles.contentStyle}>
        <img
          src={image}
          alt={text}
          className={styles.imageStyle[contentType]}
        />
        <span className={styles.textStyle}>{text}</span>
      </div>
    </div>
  );
};

export const SearchResult = _SearchResult;
