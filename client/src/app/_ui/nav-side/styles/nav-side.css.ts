import { style } from "@vanilla-extract/css";

export const frameStyle = style({});

export const innerStyle = style({
  padding: "10px 24px",
  textAlign: "right",
});

export const itemStyle = style({
  listStyle: "none",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "400",
  selectors: {
    "&:not(:first-child)": {
      marginTop: "20px",
    },
  },
});

export const linkStyle = style({
  textDecoration: "none",
  color: "#000",
});
