import { style } from "@vanilla-extract/css";

export const cardWrapperStyle = style({
  selectors: {
    "&:not(:first-child)": {
      marginTop: "24px",
    },
  },
});

export const cardInnerStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

export const actionStyle = style({
  fontSize: "14px",
});

export const userNameStyle = style({
  fontWeight: "700",
});
