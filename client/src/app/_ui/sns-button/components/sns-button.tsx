"use client";
import React from "react";
import { Button } from "@/ui";
import * as styles from "../styles/sns-button.css";

type Props = {
  color: "black" | "gray" | "pink";
  icon: string;
  label: string;
  url: string;
};

const _SnsButton = ({ color, icon, label, url }: Props) => {
  return (
    <Button color={color}>
      <div className={styles.contentStyle}>
        <div className={styles.iconWrapperStyle}>
          <img
            src={`/assets/${icon}.svg`}
            alt="GitHub"
            width={32}
            height={32}
          />
        </div>
        <span className={styles.labelStyle}>{label}</span>
      </div>
    </Button>
  );
};

export const SnsButton = _SnsButton;
