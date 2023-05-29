import { style } from "@vanilla-extract/css";

export const contentStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
});

export const titleStyle = style({
  fontSize: "16px",
  fontWeight: "700",
  position: "absolute",
  margin: "0",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});
