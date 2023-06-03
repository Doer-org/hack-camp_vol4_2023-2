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
  justifyContent: "space-between",
  alignItems: "center",
});

export const cardUserStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "14px",
});

export const cardUserNameStyle = style({
  fontWeight: "700",
});
