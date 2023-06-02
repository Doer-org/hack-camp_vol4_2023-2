import { style } from "@vanilla-extract/css";

export const formWrapperStyle = style({
  marginTop: "18px",
});

export const resultListStyle = style({
  marginTop: "18px",
});

export const artistStyle = style({
  selectors: {
    "&:not(:first-child)": {
      marginTop: "12px",
    },
  },
});
