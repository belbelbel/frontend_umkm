import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    tooltip: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    tooltip?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    tooltip: true;
  }
}

export const typography: TypographyOptions = {
  htmlFontSize: 10,
  fontFamily: ['"Cabin"', '"sans-serif"'].join(","),
  tooltip: { fontSize: "1rem", lineHeight: 1.6, fontWeight: 500 },
  h1: { fontSize: "9.6rem", lineHeight: 1.3, fontWeight: 500 },
  h2: { fontSize: "6.0rem", lineHeight: 1.3, fontWeight: 600 },
  h3: { fontSize: "4.8rem", lineHeight: 1.3, fontWeight: 600 },
  h4: { fontSize: "3.4rem", lineHeight: 1.3, fontWeight: 700 },
  h5: { fontSize: "2.4rem", lineHeight: 1.3, fontWeight: 700 },
  h6: { fontSize: "2.0rem", lineHeight: 1.3, fontWeight: 700 },
  subtitle1: { fontSize: "1.6rem", lineHeight: 1.5, fontWeight: 400 },
  subtitle2: { fontSize: "1.4rem", lineHeight: 1.7143, fontWeight: 400 },
  body1: { fontSize: "1.6rem", lineHeight: 1.5, fontWeight: 400 },
  body2: { fontSize: "1.4rem", lineHeight: 1.43, fontWeight: 400 },
  button: { fontWeight: 500 },
  caption: { fontSize: "1.2rem", lineHeight: 1.33, fontWeight: 400 },
  overline: {
    fontSize: "1.0rem",
    lineHeight: 1.6,
    fontWeight: 400,
    letterSpacing: ".1rem",
  },
};
