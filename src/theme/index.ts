import { createTheme, responsiveFontSizes, ThemeOptions } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ['"Cabin"', "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 905,
      lg: 1280,
      xl: 1440,
    },
  },
} as ThemeOptions);

export default responsiveFontSizes(theme);
// export default theme;
