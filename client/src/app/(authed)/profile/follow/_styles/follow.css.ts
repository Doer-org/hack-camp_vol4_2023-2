import { style } from "@vanilla-extract/css";

export const cardWrapperStyle = style({
  selectors: {
    "&:not(:first-child)": {
      marginTop: "24px",
    },
  },
});

export const cardStyle = style({
  display: "flex",
  justifyContent: "space-between",
});

export const cardUserStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

export const cardUserNameStyle = style({
  fontSize: "14px",
  fontWeight: "700",
});
