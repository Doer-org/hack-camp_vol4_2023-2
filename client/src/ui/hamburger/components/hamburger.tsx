"use client";
import React, { useState } from "react";
import * as styles from "../styles/hamburger.css";

type Props = {
  onClick?: () => void;
};

const _Hamburger = ({ ...props }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const barClassList = [styles.barStyle, open && styles.barOpenStyle];

  return (
    <div className={styles.wrapperStyle} {...props}>
      <div className={styles.boxStyle} onClick={handleClick}>
        <span className={barClassList.join(" ")}></span>
        <span className={barClassList.join(" ")}></span>
        <span className={barClassList.join(" ")}></span>
      </div>
    </div>
  );
};

export const Hamburger = _Hamburger;
