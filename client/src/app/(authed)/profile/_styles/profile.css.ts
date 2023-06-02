import { style } from "@vanilla-extract/css";

export const containerStyle = style({
  paddingTop: "118px",
  paddingBottom: "56px",
});

export const contentStyle = style({
  margin: "24px 0",
  padding: "0 24px",
});

export const headStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const categoriesStyle = style({
  display: "flex",
  gap: "10px",
});

export const cardListStyle = style({
  marginTop: "24px",
});

export const cardStyle = style({
  selectors: {
    "&:not(:first-child)": {
      marginTop: "24px",
    },
  },
});
