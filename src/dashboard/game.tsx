import React from "react"
import { css } from "@emotion/css"
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@material-ui/core"
import render from "../render"
import Section from "../components/Section"
import TextSection from "../components/TextSection"
import useGameScreen from "../hooks/useGameScreen"
import useGameText from "../hooks/useGameText"

const Panel = () => {
  const gameText = useGameText()
  return (
    <>
      <ScreenSection />
      <TextSection label="Game Text" hook={gameText} />
    </>
  )
}

const ScreenSection = () => {
  const gameScreen = useGameScreen()
  return (
    <Section>
      <FormGroup>
        {["showScores", "showCommentators"].map(name => (
          <FormControlLabel
            key={name}
            control={
              <Switch
                color="primary"
                checked={gameScreen.state[name]}
                onChange={e =>
                  gameScreen.replicateState({
                    type: name,
                    payload: e.target.checked,
                  })
                }
                name={name}
              />
            }
            label={
              <Typography variant="button">
                {name.slice(0, 4) + " " + name.slice(4)}
              </Typography>
            }
            labelPlacement="start"
            className={css`
              justify-content: space-between;
              margin: 0px;
            `}
          />
        ))}
      </FormGroup>
    </Section>
  )
}

render(Panel)
