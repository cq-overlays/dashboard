import React from "react"
import { css } from "@emotion/css"
import { Button, Box, Typography } from "@material-ui/core"
import render, { theme } from "../render"
import Section from "../components/Section"
import TextSection from "../components/TextSection"
import useBreakScreen from "../hooks/useBreakScreen"
import useBreakText from "../hooks/useBreakText"

const Panel = () => {
  const breakText = useBreakText()
  return (
    <>
      <ScreenSection />
      <TextSection label="Break Text" hook={breakText} />
    </>
  )
}

const ScreenSection = () => {
  const breakScreen = useBreakScreen()
  const isSelected = (screen: string) => screen === breakScreen.replicant
  const handleClick = (screen: string) => () => {
    breakScreen.replicateState({ payload: screen })
  }
  return (
    <Section>
      <Box
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: stretch;
        `}
      >
        <Box
          className={css`
            display: flex;
            flex-direction: column;
            gap: ${theme.spacing(1.5)}px;
            width: 100%;
          `}
        >
          {["maplist", "brb", "rosters"].map(screen => (
            <Box
              className={css`
                display: flex;
                align-items: baseline;
                justify-content: space-between;
              `}
            >
              <Typography>
                {screen.replace(/^\w/, c => c.toUpperCase())} Screen
              </Typography>
              <Box ml={1.5}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleClick(screen)}
                  disabled={isSelected(screen)}
                >
                  {isSelected(screen) ? "Active" : "Switch"}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Section>
  )
}

render(Panel)
