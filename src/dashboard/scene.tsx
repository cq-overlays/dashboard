import React from "react"
import { css } from "@emotion/css"
import {
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Box,
  Button,
  SvgIcon,
  TextField,
  FormGroup,
  Switch,
} from "@material-ui/core"
import render, { theme } from "../render"
import Section from "../components/Section"
import TextSection from "../components/TextSection"
import useBreakScreen from "../hooks/useBreakScreen"
import useFlavorText from "../hooks/useFlavorText"
import useMusic from "../hooks/useMusic"
import useGameScreen from "../hooks/useGameScreen"
import useRoundName from "../hooks/useRoundName"

const Panel = () => {
  const flavorText = useFlavorText()
  const roundName = useRoundName()
  return (
    <>
      <GameScreenSection />
      <BreakScreenSection />
      <TextSection label="Flavor Text" hook={flavorText} />
      <TextSection label="Round Name" hook={roundName} />
      <MusicSection />
    </>
  )
}

const GameScreenSection = () => {
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

const BreakScreenSection = () => {
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

const MusicSection = () => {
  const music = useMusic()
  const isUpdated = () =>
    JSON.stringify(music.state) === JSON.stringify(music.replicant)

  return (
    <Section>
      <Box
        mb={3}
        className={css`
          display: flex;
          gap: ${theme.spacing(1.5)}px;
        `}
      >
        <TextField
          label="Song"
          value={music.state.song || ""}
          onChange={e =>
            music.updateState({ type: "setSong", payload: e.target.value })
          }
        />
        <TextField
          label="Artist"
          value={music.state.artist || ""}
          onChange={e =>
            music.updateState({ type: "setArtist", payload: e.target.value })
          }
        />
      </Box>
      <Box
        className={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <LastFMButton />
        <Button
          color="primary"
          variant="contained"
          disabled={isUpdated()}
          onClick={() => music.replicateState()}
        >
          {isUpdated() ? "Updated" : "Update"}
        </Button>
      </Box>
    </Section>
  )
}

const LastFMButton = () => {
  const linked = false
  return (
    <Button
      color={linked ? "primary" : "secondary"}
      variant="outlined"
      startIcon={
        <SvgIcon>
          <circle cx="50%" cy="50%" r="4.5" />
        </SvgIcon>
      }
    >
      <Typography color="textPrimary">
        LastFM - {linked ? "linked" : "unlinked"}
      </Typography>
    </Button>
  )
}

render(Panel)
