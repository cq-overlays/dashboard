import React from "react"
import { render } from "react-dom"
import { css } from "@emotion/css"
import { SvgIcon } from "@mui/material"
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
  alpha,
} from "@mui/material/styles"
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/open-sans/700.css"
import "@fontsource/open-sans/800.css"
import "./overrides.css"

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    grey: true
  }
}

declare module "@mui/material" {
  interface Color {
    main: string
    dark: string
  }
}

export const AddRounded = () => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </SvgIcon>
)

export const RemoveRounded = () => (
  <SvgIcon
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </SvgIcon>
)

const rawTheme = createTheme({
  typography: {
    fontFamily: [
      "Open Sans",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      letterSpacing: "0.05em",
    },
  },
  palette: {
    mode: "dark",
    primary: {
      light: "#008585",
      main: "#00BEBE",
      dark: "#33cbcb",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ab003c",
      main: "#f50057",
      dark: "#f73378",
      contrastText: "#fff",
    },
    grey: {
      50: "#626E84",
      100: "#232c3d",
      200: "#263042",
      300: "#293346",
      400: "#2c374b",
      500: "#2f3a4f",
      600: "#38445a",
      700: "#414d64",
      800: "#4a566e",
      900: "#525f78",
      A700: "#626E84",
      A400: "#707B8F",
      A200: "#7D8799",
      A100: "#8992A2",
      main: "#293346",
      dark: "#2c374b",
    },
  },
})

export const theme = createTheme(rawTheme, {
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "grey" },
          style: {
            color: rawTheme.palette.getContrastText(rawTheme.palette.grey[300]),
          },
        },
        {
          props: { variant: "outlined", color: "grey" },
          style: {
            color: rawTheme.palette.text.primary,
            borderColor:
              rawTheme.palette.mode === "light"
                ? "rgba(0, 0, 0, 0.23)"
                : "rgba(255, 255, 255, 0.23)",
            "&.Mui-disabled": {
              border: `1px solid ${rawTheme.palette.action.disabledBackground}`,
            },
            "&:hover": {
              borderColor:
                rawTheme.palette.mode === "light"
                  ? "rgba(0, 0, 0, 0.23)"
                  : "rgba(255, 255, 255, 0.23)",
              backgroundColor: alpha(
                rawTheme.palette.text.primary,
                rawTheme.palette.action.hoverOpacity
              ),
            },
          },
        },
        {
          props: { color: "grey", variant: "text" },
          style: {
            color: rawTheme.palette.text.primary,
            "&:hover": {
              backgroundColor: alpha(
                rawTheme.palette.text.primary,
                rawTheme.palette.action.hoverOpacity
              ),
            },
          },
        },
      ],
    },
  },
})

const Template = ({ children }: any) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <div
        className={css`
          font-family: "Open Sans", "Roboto", "Helvetica", "Arial", "sans-serif";
        `}
      >
        {children}
      </div>
    </ThemeProvider>
  </StyledEngineProvider>
)

export default (App: any) => {
  render(
    <Template>
      <App />
    </Template>,
    document.getElementById("app")
  )
}
