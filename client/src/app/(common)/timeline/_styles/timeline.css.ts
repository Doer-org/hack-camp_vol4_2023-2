import { style } from "@vanilla-extract/css";

export const noticeStyle = style({
  selectors: {
    "&:not(:first-child)": {
      marginTop: "24px",
    },
  },
});

export const labelStyle = style({
  marginTop: "36px",
});
