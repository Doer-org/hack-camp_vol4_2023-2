import { style } from "@vanilla-extract/css";

export const frameStyle = style({
  background: "#fff",
  height: "100%",
  width: "100%",
});

export const innerStyle = style({
  padding: "12px 24px",
  textAlign: "right",
  marginBlock: "unset",
});

export const itemStyle = style({
  listStyle: "none",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: "400",
  selectors: {
    "&:not(:first-child)": {
      marginTop: "24px",
    },
  },
});

export const linkStyle = style({
  textDecoration: "none",
  color: "#000",
});
