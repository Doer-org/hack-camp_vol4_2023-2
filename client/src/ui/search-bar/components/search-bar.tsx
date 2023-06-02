import React from "react";
import * as styles from "../styles/search-bar.css";

type Props = {
  contentType?: "music" | "book" | "artist" | "author";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const _SearchBar = ({ contentType = "music", onChange }: Props) => {
  // placeholderに入れるワード
  const words = {
    music: "曲",
    book: "本",
    artist: "アーティスト",
    author: "著者",
  };

  return (
    <div className={styles.wrapperStyle}>
      <input
        type="text"
        placeholder={`${words[contentType]}を検索...`}
        className={styles.searchBarStyle}
        onChange={onChange}
      />
    </div>
  );
};

export const SearchBar = _SearchBar;
