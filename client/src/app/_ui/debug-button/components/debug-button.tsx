"use client";
import { Button } from "@/ui";

type Props = {
  color: "black" | "gray" | "pink";
  label: string;
  url: string;
};

const _DebugButton = ({ color, label, url }: Props) => {
  return (
    <Button
      color={color}
      label={label}
      onClick={() => {
        (async () => {
          const resp = await fetch(url, {
            credentials: "include",
          });
          const data = await resp.json();
          console.log("debug button clicked", url, data);
          return data;
        })();
      }}
    />
  );
};

_DebugButton.displayName = "DebugButton";

export const DebugButton = _DebugButton;
