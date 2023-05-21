import { createTheme, responsiveFontSizes } from "@mui/material";

const commonTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  typography: {
    h1: {
      fontSize: "3.3rem",
      fontWeight: 700,
      letterSpacing: "-0.5px",
      "@media (max-width:600px)": {
        fontSize: "2.8rem",
      },
    },
    h2: {
      fontSize: "3rem",
      fontWeight: 600,
      letterSpacing: "0.5px",
      "@media (max-width:600px)": {
        fontSize: "2.4rem",
      },
    },
    h3: {
      fontSize: "2.2rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "2rem",
      },
    },
    h4: {
      fontSize: "1.8rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "1.6rem",
      },
    },
    h5: {
      fontSize: "1.6rem",
      fontWeight: 600,
      letterSpacing: "0.2px",
      "@media (max-width:600px)": {
        fontSize: "1.4rem",
      },
    },
    h6: {
      fontSize: "1.2rem",
      fontWeight: 600,
      "@media (max-width:600px)": {
        fontSize: "1rem",
      },
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "0.9rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "0.8rem",
      },
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
};

const mainColors = {
  black: "#121212",
  white: "#fff",
  card: "#F5F5F5",
  primary: "#4b7fd7",
};

const mainTheme = responsiveFontSizes(
  createTheme({
    ...commonTheme,
    palette: {
      primary: { main: "#4b7fd7" },
      text: {
        primary: mainColors.black,
      },
      background: {
        default: mainColors.white,
        paper: mainColors.card,
      },
    },
    typography: {
      allVariants: {
        fontFamily: "Poppins, sans-serif",
      },
    },
    shape: {
      borderRadius: 8,
    },
    overrides: {
      MuiButton: {
        containedPrimary: {
          color: mainColors.white,
        },
      },
    },
  })
);

const useColors = () => {
  return mainColors;
};

export { mainTheme, mainColors, useColors };
