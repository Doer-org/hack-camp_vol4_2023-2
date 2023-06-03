import { style } from "@vanilla-extract/css";

export const contentStyle = style({
  width: "98px",
  textAlign: "center",
});

export const iconStyle = style({
  display: "flex",
  justifyContent: "center",
  marginBottom: "4px",
});

export const nameStyle = style({
  margin: "0 0 4px",
  fontSize: "14px",
  fontWeight: "700",
});

export const roleStyle = style({
  margin: "0 0 8px",
  color: "#636363",
  fontSize: "10px",
  fontWeight: "400",
});

export const snsArea = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
});
