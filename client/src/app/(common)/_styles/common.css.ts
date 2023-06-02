import { style } from "@vanilla-extract/css";

export const containerStyle = style({
  paddingTop: "78px",
  paddingBottom: "56px",
  background: "#f9f8f4",
  minHeight: "100vh",
});

export const contentStyle = style({
  margin: "24px 0",
  padding: "0 24px",
});

export const navStyle = style({
  position: "fixed",
  width: "100%",
  height: "100%",
  paddingTop: "78px",
  paddingBottom: "56px",
  boxSizing: "border-box",
  pointerEvents: "none",
  opacity: 0,
  zIndex: 1,
  transition: "opacity .25s ease",
});

export const navOpenStyle = style({
  pointerEvents: "auto",
  opacity: 1,
});
