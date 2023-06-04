import { style, styleVariants } from "@vanilla-extract/css";

export const wrapperStyle = style({
  cursor: "pointer",
});

export const linkStyle = style({
  display: "block",
  width: "100%",
  height: "100%",
});

export const imageStyle = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const size = styleVariants({
  small: { width: "42px", height: "42px" },
  large: { width: "84px", height: "84px" },
});
