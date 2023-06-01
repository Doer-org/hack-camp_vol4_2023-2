import { style, styleVariants } from "@vanilla-extract/css";

export const wrapperStyle = style({
  width: "100%",
  padding: "0 24px",
  boxSizing: "border-box",
});

export const contentStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
});

export const textStyle = style({
  width: "calc(100% - 72px)",
  fontSize: "14px",
  fontWeight: "400",
  overflowWrap: "break-word",
});

export const imageStyle = styleVariants({
  music: { width: "60px", height: "60px", objectFit: "cover" },
  book: { width: "60px", height: "84px", objectFit: "cover" },
  person: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
  },
});
