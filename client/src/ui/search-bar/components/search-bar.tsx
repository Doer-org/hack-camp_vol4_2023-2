"use client";
import React, { useEffect, useState } from "react";
import * as styles from "../styles/search-bar.css";

type Props = {
  contentType: "music" | "book" | "artist" | "author";
};

const _SearchBar = ({ contentType }: Props) => {
  // placeholderに入れるワード
  const words = {
    music: "曲",
    book: "本",
    artist: "アーティスト",
    author: "著者",
  };

  // 入力値の監視
  const [query, setQuery] = useState<string>("");
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.wrapperStyle}>
      <input
        type="text"
        placeholder={`${words[contentType]}を検索...`}
        value={query}
        className={styles.searchBarStyle}
        onChange={handleQueryChange}
      />
    </div>
  );
};

export const SearchBar = _SearchBar;
