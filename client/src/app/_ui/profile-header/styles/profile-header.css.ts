import { style } from "@vanilla-extract/css";

export const headStyle = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const profileStyle = style({
  display: "flex",
  alignItems: "center",
  gap: "14px",
  fontSize: "16px",
  fontWeight: "700",
});

export const followWrapperStyle = style({
  marginTop: "18px",
});

export const followStyle = style({
  selectors: {
    "&:not(:first-child)": {
      marginLeft: "20px",
    },
  },
});

export const followCountStyle = style({
  color: "#ff7987",
  fontSize: "16px",
  fontWeight: "700",
  paddingRight: "4px",
});

export const followlabelStyle = style({
  fontSize: "14px",
  fontWeight: "500",
});
