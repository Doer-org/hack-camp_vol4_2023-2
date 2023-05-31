import { style } from "@vanilla-extract/css";

export const contentStyle = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
});

export const avatorActive = style({
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid #0B002A",
  borderRadius: "50%",
  boxSizing: "border-box",
});

export const avatorInactive = style({
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
