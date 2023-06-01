"use client";
import React, { useState, useEffect, useRef } from "react";
import * as styles from "../styles/ranking.css";

type Props = {
  rank?: number;
  image: string;
  contentType: "music" | "book" | "person";
  onClick?: () => void;
};

const _Ranking = ({ image, rank, contentType, ...props }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(e.target as Node)
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
    const handleWindowClick = (e: MouseEvent) => {
      handleOutsideClick(e);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <div
      ref={componentRef}
      className={styles.contentStyle}
      onClick={() => setActive(true)}
      {...props}
    >
      {typeof rank !== "undefined" && (
        <span className={styles.rankStyle}>{rank}</span>
      )}
      <img
        src={image}
        alt={`${rank}位`}
        className={[
          styles.imageStyle[contentType],
          active && styles.activeStyle,
        ].join(" ")}
      />
    </div>
  );
};

export const Ranking = _Ranking;
