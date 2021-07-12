import React from "react"
import { css } from "@emotion/css"
import {
  Box,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core"
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
          <RadioGroup
            value={breakScreen.replicant || ""}
            onChange={e => {
              breakScreen.replicateState({ payload: e.target.value })
            }}
          >
            {["maplist", "brb", "rosters"].map(screen => (
              <FormControlLabel
                key={screen}
                value={screen}
                control={<Radio color="primary" />}
                label={
                  <Typography variant="button">{screen} screen</Typography>
                }
              />
            ))}
          </RadioGroup>
        </Box>
      </Box>
    </Section>
  )
}

render(Panel)
