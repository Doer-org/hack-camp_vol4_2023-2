import { style } from "@vanilla-extract/css";

export const contentStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const profileStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "14px",
  fontSize: "16px",
  fontWeight: "700",
});

export const buttonStyle = style({
  height: "42px",
});
