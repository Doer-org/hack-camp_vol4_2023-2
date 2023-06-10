import { style, styleVariants } from "@vanilla-extract/css";

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

export const containerStyle = style({
  paddingBottom: "56px",
});

export const headerAvoidStyle = styleVariants({
  common: { paddingTop: "66px" },
  profile: { paddingTop: "112px" },
});

export const contentStyle = style({
  margin: "24px 0",
  padding: "0 24px",
});

export const navStyle = style({
  position: "fixed",
  width: "100%",
  height: "100%",
  paddingBottom: "56px",
  boxSizing: "border-box",
  pointerEvents: "none",
  opacity: 0,
  zIndex: 1,
  transition: "opacity .25s ease",
});

// export const navOpenStyle = style({
//   pointerEvents: "auto",
//   opacity: 1,
// });
