import { style } from "@vanilla-extract/css";

export const frameStyle = style({
  width: "342px",
  padding: "20px 0",
  borderRadius: "10px",
  boxSizing: "border-box",
  background: "#fff",
});

export const crossWrapperStyle = style({
  textAlign: "right",
  height: "24px",
  padding: "0 20px",
});

export const crossStyle = style({
  display: "inline-block",
  width: "24px",
  height: "100%",
  position: "relative",
  margin: "0 auto",
  cursor: "pointer",
});

export const crossBarStyle = style({
  display: "inline-block",
  width: "24px",
  border: "1px solid #0b002a",
  position: "absolute",
  top: "50%",
  left: "50%",
  selectors: {
    "&:nth-child(1)": {
      transform: "translate(-50%, -50%) rotate(45deg)",
    },
    "&:nth-child(2)": {
      transform: "translate(-50%, -50%) rotate(-45deg)",
    },
  },
});

export const contentStyle = style({
  padding: "32px 44px",
  textAlign: "center",
});

export const buttonStyle = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  background: "#0b002a",
  height: "60px",
  borderRadius: "10px",
  padding: "10px",
  boxSizing: "border-box",
  cursor: "pointer",
});

export const buttonImageStyle = style({
  background: "#0b002a",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
});

export const buttonTextStyle = style({
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
});

export const contentTextStyle = style({
  fontSize: "14px",
  margin: "36px 0 0 0",
});

export const contentTextLinkStyle = style({
  color: "#5551ff",
  textDecoration: "none",
});
