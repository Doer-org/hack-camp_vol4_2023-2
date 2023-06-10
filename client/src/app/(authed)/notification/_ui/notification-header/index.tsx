"use client";
import { CommonHeader, NavMenu } from "@/app/_ui";
import { Hamburger, Logo } from "@/ui";
import { useState } from "react";

type Props = {
  user_id: string;
};

const _NotificationHeader = ({ user_id }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <CommonHeader
        title="通知"
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

export const NotificationHeader = _NotificationHeader;
