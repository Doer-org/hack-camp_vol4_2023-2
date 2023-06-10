import { Header } from "@/ui";
import { ReactNode } from "react";

type Props = {
  title?: string;
  left: ReactNode;
  right: ReactNode;
};

const _CommonHeader = ({ left, title, right }: Props) => {
  return (
    <Header size="small">
      {left}
      <div
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          lineHeight: "1.5rem",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </div>
      {right}
    </Header>
  );
};

export const CommonHeader = _CommonHeader;
