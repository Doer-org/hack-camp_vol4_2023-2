"use client";

import { CommonHeader, Hamburger, Logo, NavMenu } from "@/ui";
import { useState } from "react";

type Props = {
  user_id: string;
};

const _TimelineHeader = ({ user_id }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <CommonHeader
        title="タイムライン"
        left={<Logo />}
        right={
          <Hamburger
            isOpen={isOpen}
            onClick={() => {
              setIsOpen((isOpen) => !isOpen);
            }}
          />
        }
      />
      <NavMenu user_id={user_id} isOpen={isOpen} />
    </>
  );
};

export const TimelineHeader = _TimelineHeader;
