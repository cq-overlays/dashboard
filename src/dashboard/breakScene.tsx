import React from "react"
import { css } from "@emotion/css"
import {
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Box,
} from "@material-ui/core"
import render from "../render"
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
      <RadioGroup
        value={breakScreen.replicant || ""}
        onChange={e => {
          breakScreen.replicateState({ payload: e.target.value })
        }}
      >
        {["brb", "maplist", "rosters"].map(screen => (
          <FormControlLabel
            key={screen}
            value={screen}
            control={<Radio color="primary" />}
            label={
              <Box ml={1.5}>
                <Typography variant="button">{screen} screen</Typography>
              </Box>
            }
            className={css`
              margin: 0px;
            `}
          />
        ))}
      </RadioGroup>
    </Section>
  )
}

render(Panel)
