import { style } from "@vanilla-extract/css";

export const contentStyle = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const leftStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "14px",
});

export const titleStyle = style({
  fontSize: "16px",
  fontWeight: "700",
  margin: 0,
});
