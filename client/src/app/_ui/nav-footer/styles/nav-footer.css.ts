import { style } from "@vanilla-extract/css";

export const contentStyle = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
});

export const itemStyle = style({
  width: "30%",
  height: "100%",
  cursor: "pointer",
});

export const linkStyle = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const avatarActive = style({
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #0B002A",
  borderRadius: "50%",
  boxSizing: "border-box",
});

export const avatarInactive = style({
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
