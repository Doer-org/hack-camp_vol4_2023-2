import { style, styleVariants } from "@vanilla-extract/css";

export const contentStyle = style({
  borderRadius: "10px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "700",
  padding: "10px 16px 12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const background = styleVariants({
  black: { background: "#0B002A" },
  gray:  { background: "#B0AEAF" },
  pink:  { background: "#FF7987" },
});

