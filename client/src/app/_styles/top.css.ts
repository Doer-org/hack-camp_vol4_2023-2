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

export const bgBeige = style({
  backgroundColor: "#F9F8F4",
});

export const bgPink = style({
  backgroundColor: "#FFEFF0",
});

export const sectionTitle = style({
  margin: "0 0 36px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "700",
});

export const introduction = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "24px",
  padding: "0 24px",
});

export const introductionImage = style({
  width: "90px",
});

export const introductionText = style({
  margin: "0",
  fontSize: "14px",
});

export const creators = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "24px",
});

export const doer = style({
  textAlign: "center",
});

export const doerImage = style({
  width: "150px",
  marginBottom: "24px",
});

export const doerCatchphrase = style({
  fontSize: "18px",
  fontWeight: 400,
  margin: "0 0 24px",
});

export const doerDescription = style({
  fontSize: "14px",
  fontWeight: 400,
  margin: "0 0 24px",
});

export const doerSns = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
});

export const footer = style({
  fontSize: "12px",
  fontWeight: 700,
  textAlign: "center",
  color: "#FFF",
  backgroundColor: "#0B002A",
  padding: "12px 24px",
});

export const footerText = style({
  margin: 0,
});
