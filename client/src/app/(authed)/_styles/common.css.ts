import { style, styleVariants } from "@vanilla-extract/css";

export const containerStyle = style({
  paddingBottom: "56px",
});

export const headerAvoidStyle = styleVariants({
  common: { paddingTop: "78px" },
  profile: { paddingTop: "112px" },
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
