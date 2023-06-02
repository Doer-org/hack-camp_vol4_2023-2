import { style } from "@vanilla-extract/css";

export const wrapperStyle = style({
  minHeight: "100vh",
  padding: "70px 0 0",
  boxSizing: "border-box",
  background: "#FFF",
});

export const contentStyle = style({
  padding: "84px 24px",
});

export const catchphraseArea = style({
  position: "relative",
});

export const logo = style({
  position: "absolute",
  top: "-32px",
  left: "15px",
  zIndex: -1,
});

export const catchphrase = style({
  margin: "0 0 44px",
  fontSize: "36px",
  fontWeight: "700",
  textAlign: "center",
  color: "#0B002A",
});

export const description = style({
  margin: "0 0 52px",
  fontSize: "16px",
  textAlign: "center",
});

export const centering = style({
  display: "flex",
  justifyContent: "center",
});

export const textPink = style({
  color: "#FF7987",
  fontWeight: "700",
});

export const bgBeige = {
  backgroundColor: "#F9F8F4",
};

export const sectionTitle = style({
  margin: "0 0 36px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "700",
});
