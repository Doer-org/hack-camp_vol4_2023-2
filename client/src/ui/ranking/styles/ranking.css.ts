import { style, styleVariants } from "@vanilla-extract/css";

export const contentStyle = style({
  width: "90px",
  position: "relative",
  cursor: "pointer",
});

export const rankStyle = style({
  position: "absolute",
  top: "-18px",
  left: "4px",
  fontSize: "36px",
  fontWeight: "700",
  fontStyle: "italic",
  lineHeight: "36px",
  textShadow: "1px 1px 0 #FFF",
});

export const imageStyle = styleVariants({
  music: {
    display: "block",
    width: "100%",
    height: "90px",
    objectFit: "cover",
  },
  book: {
    display: "block",
    width: "100%",
    height: "128px",
    objectFit: "cover",
  },
  person: {
    display: "block",
    width: "100%",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
  },
});

export const noImageStyle = styleVariants({
  music: {
    width: "100%",
    height: "90px",
    backgroundColor: "#F9F8F4",
  },
  book: {
    width: "100%",
    height: "128px",
    backgroundColor: "#F9F8F4",
  },
  person: {
    width: "100%",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "#F9F8F4",
  },
});

export const activeStyle = style({
  outline: "2px solid #0B002A",
  outlineOffset: "-2px",
});
