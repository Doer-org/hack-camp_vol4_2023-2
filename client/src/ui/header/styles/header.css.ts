import { style, styleVariants } from "@vanilla-extract/css";

export const headerStyle = style({
  width: "100%",
  padding: "12px 24px",
  background: "#fff",
  position: "fixed",
  top: "0",
  left: "0",
  boxSizing: "border-box",
  zIndex: "2",
});

export const size = styleVariants({
  small: { height: "78px" },
});
