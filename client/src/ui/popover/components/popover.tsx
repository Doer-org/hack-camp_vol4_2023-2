"use client";
import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import "../styles/base.css";
import * as styles from "../styles/popover.css";

const _PopoverDemo = () => (
  <Popover.Root>
    <Popover.Trigger className={styles.triggerStyle}>More info</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className={styles.contentStyle}>
        Some more info…
        <Popover.Arrow className={styles.arrowStyle} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export const PopoverDemo = _PopoverDemo;
