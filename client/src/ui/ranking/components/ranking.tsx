"use client";
import React, { useState, useEffect, useRef } from "react";
import * as styles from "../styles/ranking.css";

type Props = {
  contentType: "music" | "book" | "person";
  image?: string;
  rank?: number;
  manageActive?: boolean;
  onClick?: () => void;
};

const _Ranking = ({
  contentType,
  image,
  rank,
  manageActive = false,
  ...props
}: Props) => {
  // active状態の管理
  const [active, setActive] = useState<boolean>(false);
  // componentを参照
  const componentRef = useRef<HTMLDivElement>(null);

  // component外部をクリックした場合、activeをfalseに
  const handleOutsideClick = (e: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(e.target as Node)
    ) {
      setActive(false);
    }
  };

  // windowのクリックイベントの処理
  useEffect(() => {
    if (!manageActive) {
      return;
    }

    const handleWindowClick = (e: MouseEvent) => {
      handleOutsideClick(e);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, [manageActive]);

  const handleInsideClick = () => {
    if (manageActive) {
      setActive(true);
    }
  };

  return (
    <div
      ref={componentRef}
      className={styles.contentStyle}
      onClick={handleInsideClick}
      {...props}
    >
      {rank !== undefined && <span className={styles.rankStyle}>{rank}</span>}
      {image === undefined ? (
        <div
          className={[
            styles.noImageStyle[contentType],
            active && styles.activeStyle,
          ].join(" ")}
        ></div>
      ) : (
        <img
          src={image}
          alt={`${rank}位`}
          className={[
            styles.imageStyle[contentType],
            active && styles.activeStyle,
          ].join(" ")}
        />
      )}
    </div>
  );
};

export const Ranking = _Ranking;
