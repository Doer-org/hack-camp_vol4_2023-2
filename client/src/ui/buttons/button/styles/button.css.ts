import { style, styleVariants } from "@vanilla-extract/css";

export const contentStyle = style({
  border: 0,
  borderRadius: "10px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "700",
  padding: "10px 16px 12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  boxSizing: "border-box",
});

export const background = styleVariants({
  black: { background: "#0B002A" },
  gray: { background: "#B0AEAF" },
  pink: { background: "#FF7987" },
});

export const size = styleVariants({
  small: { height: "42px" },
  medium: { height: "45px" },
});
