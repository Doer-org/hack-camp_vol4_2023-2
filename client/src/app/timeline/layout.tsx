import React from "react";
import { Logo, Hamburger } from "@/ui";
import { CommonHeader } from "../_ui";

export default function TimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommonHeader
        title="タイムライン"
        left={<Logo />}
        right={<Hamburger />}
      />
      {children}
    </>
  );
}
