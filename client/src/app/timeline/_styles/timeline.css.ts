import { style } from "@vanilla-extract/css";

export const containerStyle = style({
  paddingTop: "78px",
  paddingBottom: "56px",
  background: "#f9f8f4",
  minHeight: "100vh",
});

export const contentStyle = style({
  margin: "24px 0",
  padding: "0 24px",
});

export const noticeStyle = style({
  selectors: {
    "&:not(:first-child)": {
      marginTop: "24px",
    },
  },
});
