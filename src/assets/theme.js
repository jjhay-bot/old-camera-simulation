import { createTheme } from "@mui/material/styles";
import { CloseIcon } from "./icons";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ed5a29",
    },
    secondary: {
      main: "#07a69c",
    },
  },
  typography: {
    fontFamily: "Poppins",
    title: {
      fontFamily: "Poppins",
      fontSize: "20px",
      fontWeight: 700,
      letterSpacing: "1px",
      color: "#000",
    },
    description: {
      fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 400,
      color: "#4E4B66",
    },
    label: {
      fontFamily: "Poppins",
      fontSize: "15px",
      fontWeight: 700,
      color: "#000",
      letterSpacing: "0.25px",
    },
    header: {
      fontFamily: "Poppins",
      fontSize: "15px",
      fontWeight: 700,
      color: "#000",
      letterSpacing: "0.25px",
    },
    icon: {
      color: "#ED5A29",
    },
    button: {
      fontFamily: "Poppins",
      fontSize: "15px",
      textTransform: "unset",
      fontWeight: 700,
      letterSpacing: "0.75px",
      color: "#fff",
    },
    modal_title: {
      fontFamily: "Poppins",
      fontSize: "17px",
      fontWeight: 700,
      letterSpacing: "0.75px",
    },
    modal_description: {
      fontSize: "15px",
      fontWeight: 400,
      letterSpacing: "0.75px",
      color: "#4E4B66",
    },
    subtitle2: {
      fontFamily: "Poppins",
      fontSize: "15px",
      fontWeight: 400,
      letterSpacing: "0.75px",
      color: "#ffffff",
    },
    subtitle1: {
      fontFamily: "Poppins",
      fontSize: "13px",
      fontWeight: 600,
      letterSpacing: "0.25px",
      color: "#4E4B66",
    },
    body1: {
      fontSize: "15px",
      fontWeight: 400,
      letterSpacing: "0.75px",
      color: "#262338",
    },
    body2: {
      fontSize: "15px",
      fontWeight: 500,
      letterSpacing: "0.75px",
      color: "#262338",
    },
    progress: {
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.75px",
      color: "#000",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "8px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          textTransform: "unset",
        },
        "&.Mui-disabled": {
          backgroundColor: "#F7F7FC",
          color: "#F7F7FC",
        },
      },
    },

    MuiAlert: {
      defaultProps: {
        components: {
          CloseIcon: CloseIcon,
        },
      },
    },

    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(38, 35, 56, 0.40)",
        },
      },
    },
  },
});

export default theme;
