"use client";
import { Button } from "@/ui";

type Props = {
  label: string;
  url: string;
};

const _DebugButton = ({ label, url }: Props) => {
  return (
    <Button
      color="black"
      label={label}
      onClick={() => {
        (async () => {
          const resp = await fetch(url);
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
