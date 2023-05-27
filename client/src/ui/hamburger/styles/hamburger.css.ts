import { style } from "@vanilla-extract/css";

export const boxStyle = style({
  width: "24px",
  cursor: "pointer",
});

export const barStyle = style({
  display: "block",
  width: "100%",
  height: "4px",
  background: "#0b002a",
  selectors: {
    "&:not(:first-child)": {
      marginTop: "6px",
    },
  },
});
