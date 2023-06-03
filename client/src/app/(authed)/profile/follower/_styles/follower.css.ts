import { style } from "@vanilla-extract/css";

export const cardStyle = style({
  display: "flex",
  justifyContent: "space-between",
});

export const cardUserStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

export const cardUserNameStyle = style({
  fontSize: "14px",
  fontWeight: "700",
});
