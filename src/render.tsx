import * as React from "react"
import { render } from "react-dom"
import { css } from "@emotion/css"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { StylesProvider } from "@material-ui/core/styles"
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/open-sans/700.css"
import "@fontsource/open-sans/800.css"

export const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Open Sans",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    type: "dark",
    primary: {
      light: "#008585",
      main: "#00BEBE",
      dark: "#33cbcb",
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
  overrides: {
    MuiButton: { root: { letterSpacing: "0.05em" } },
    MuiPaper: { root: { backgroundColor: "#2c374b" } },
  },
})

const Template = ({ children }) => (
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

export default App => {
  render(
    <Template>
      <App />
    </Template>,
    document.getElementById("app")
  )
}
