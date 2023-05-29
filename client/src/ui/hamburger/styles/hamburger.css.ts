import { style } from "@vanilla-extract/css";

export const boxStyle = style({
  width: "24px",
  height: "24px",
  cursor: "pointer",
  position: "relative",
});

export const barStyle = style({
  display: "block",
  width: "100%",
  height: "4px",
  background: "#0b002a",
  position: "absolute",
  selectors: {
    "&:nth-child(1)": {
      top: "0",
    },
    "&:nth-child(2)": {
      top: "50%",
      transform: "translateY(-50%)",
    },
    "&:nth-child(3)": {
      bottom: "0",
    },
  },
});

export const barOpenStyle = style({
  width: "32px",
  height: "2px",
  selectors: {
    "&:nth-child(1)": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) rotate(45deg)",
    },
    "&:nth-child(2)": {
      display: "none",
    },
    "&:nth-child(3)": {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) rotate(-45deg)",
    },
  },
});
