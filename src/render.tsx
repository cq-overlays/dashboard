import React from "react"
import { render } from "react-dom"
import { css } from "@emotion/css"
import { SvgIcon } from "@material-ui/core"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { StylesProvider } from "@material-ui/core/styles"
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/open-sans/700.css"
import "@fontsource/open-sans/800.css"
import "./overrides.css"

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

export const theme = createMuiTheme({
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
    type: "dark",
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
    },
  },
})

const Template = ({ children }: any) => (
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <div
        className={css`
          font-family: "Open Sans", "Roboto", "Helvetica", "Arial", "sans-serif";
        `}
      >
        {children}
      </div>
    </StylesProvider>
  </ThemeProvider>
)

export default (App: any) => {
  render(
    <Template>
      <App />
    </Template>,
    document.getElementById("app")
  )
}
