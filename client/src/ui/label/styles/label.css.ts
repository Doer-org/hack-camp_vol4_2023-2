import { style, styleVariants } from "@vanilla-extract/css";

// 共通のスタイル
const base = {
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: "700",
  margin: 0,
};

const before = {
  content: "",
  flexGrow: 1,
  height: "2px",
  marginRight: "8px",
};

const after = {
  content: "",
  flexGrow: 1,
  height: "2px",
  marginLeft: "8px",
};

// 色だけ変更できる
const pink = "#FF7987";

export const labelStyle = styleVariants({
  pink: {
    ...base,
    color: pink,
    "::before": {
      ...before,
      backgroundColor: pink,
    },
    "::after": {
      ...after,
      backgroundColor: pink,
    },
  },
});
