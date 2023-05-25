import { style } from "@vanilla-extract/css";

export const triggerStyle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  padding: "0 15px",
  fontSize: "15px",
  lineHeight: "1",
  fontWeight: "500",
  height: "35px",
  backgroundColor: "white",
  color: "var(--violet11)",
  boxShadow: "0 2px 10px var(--blackA7)",
  ":hover": {
    backgroundColor: "var(--mauve3)",
  },
  ":focus": {
    boxShadow: "0 0 0 2px black",
  },
});

export const contentStyle = style({
  borderRadius: "4px",
  padding: "20px",
  width: "260px",
  fontSize: "15px",
  lineHeight: "1",
  color: "var(--violet11)",
  backgroundColor: "white",
  boxShadow:
    "0 10px 38px -10px hsl(206 22% 7% / 35%), 0 10px 20px -15px hsl(206 22% 7% / 20%)",
  ":focus": {
    outline: "none",
    boxShadow:
      "0 10px 38px -10px hsl(206 22% 7% / 35%), 0 10px 20px -15px hsl(206 22% 7% / 20%), 0 0 0 2px var(--violet7)",
  },
});

export const arrowStyle = style({
  fill: "white",
});
