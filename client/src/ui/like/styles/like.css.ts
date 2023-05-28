import { style, styleVariants } from "@vanilla-extract/css";

export const contentStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
});

export const numStyle = style({
  fontSize: "14px",
  fontWeight: "700",
});

export const fill = styleVariants({
  pink: { fill: "#ff7987" },
  gray: { fill: "#b0aeaf" },
});

export const color = styleVariants({
  pink: { color: "#ff7987" },
  gray: { color: "#b0aeaf" },
});
