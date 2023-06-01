import { style } from "@vanilla-extract/css";

export const wrapperStyle = style({
  width: "100%",
  padding: "0 24px",
  boxSizing: "border-box",
  display: "flex",
});

export const searchBarStyle = style({
  width: "100%",
  padding: "12px",
  border: "2px solid #FFF",
  borderRadius: "10px",
  fontSize: "14px",
  fontWeight: "400",
  ":focus": {
    outline: "none",
    border: "2px solid #0B002A",
  },
});
