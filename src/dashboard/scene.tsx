import { css } from "@emotion/css"
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Input,
  Radio,
  RadioGroup,
  SvgIcon,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import React from "react"
import useSWR from "swr"
import Section from "../components/Section"
import TextSection from "../components/TextSection"
import useBreakScreen from "../hooks/useBreakScreen"
import useFlavorText from "../hooks/useFlavorText"
import useGameScreen from "../hooks/useGameScreen"
import useLastFmData from "../hooks/useLastFmData"
import useMusic, { Music } from "../hooks/useMusic"
import { ReplicantReturnType } from "../hooks/useReplicant"
import render, { theme } from "../render"

const Panel = () => {
  const flavorText = useFlavorText()
  return (
    <>
      <GameScreenSection />
      <BreakScreenSection />
      <TextSection label="Flavor Text" hook={flavorText} />
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
        <CustomScreen />
      </RadioGroup>
    </Section>
  )
}

const CustomScreen = () => {
  const [screen, setScreen] = React.useState("")

  return (
    <FormControlLabel
      key="custom"
      value={screen}
      disabled={screen.length === 0}
      control={<Radio color="primary" />}
      label={
        <Box ml={1.5}>
          <Input
            size="small"
            inputProps={{
              style: {
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              },
            }}
            placeholder="Custom Screen"
            value={screen}
            onChange={e => setScreen(e.target.value.toLowerCase())}
          />
        </Box>
      }
      className={css`
        margin: 0px;
      `}
    />
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
          gap: ${theme.spacing(1.5)};
        `}
      >
        <TextField
          variant="standard"
          label="Song"
          value={music.state.song || ""}
          onChange={e =>
            music.updateState({ type: "setSong", payload: e.target.value })
          }
        />
        <TextField
          variant="standard"
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
        <LastFMButton music={music} />
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

const LastFMButton = ({ music }: { music: ReplicantReturnType<Music> }) => {
  const lastFmData = useLastFmData()
  const { data, error } = useSWR(
    () =>
      lastFmData.replicant?.enabled
        ? `//ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastFmData.replicant.config.username}&api_key=${lastFmData.replicant.config.token}&format=json&limit=1`
        : null,
    async (resource, init) => {
      // Attempt to fetch data, if json() fails, SWR will handle it
      const response = await fetch(resource, init)
      const data = await response.json()
      // Check if the request has failed
      if (data.error) {
        throw new Error(data.message)
      }
      // All good! Get song data
      const lastSong = data.recenttracks.track?.[0]
      const output =
        !lastSong || !lastSong["@attr"]?.nowplaying
          ? {
              status: "idle",
              music: {
                song: null,
                artist: null,
              },
            }
          : {
              status: "playing",
              music: {
                song: lastSong.name,
                artist: lastSong.artist["#text"],
              },
            }
      if (JSON.stringify(output.music) !== JSON.stringify(music.replicant)) {
        music.replicateState({
          type: "load",
          payload: output.music,
        })
      }
      return output
    },
    { refreshInterval: 8000 }
  )
  const state = {
    status: lastFmData.state.enabled
      ? error
        ? "error"
        : data?.status
        ? data?.status
        : "loading"
      : "disabled",
    error: error,
    color: () =>
      data?.status === "playing" || data?.status === "idle"
        ? "primary"
        : "secondary",
    tooltip: error
      ? error.message
      : lastFmData.state.enabled
      ? "Disable"
      : "Enable",
  }
  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <>
      <Tooltip title={state.tooltip} placement="top" arrow={true}>
        <Button
          color={state.color()}
          variant="outlined"
          startIcon={
            <SvgIcon>
              <circle cx="50%" cy="50%" r="4.5" />
            </SvgIcon>
          }
          onClick={() =>
            lastFmData.state.enabled
              ? lastFmData.replicateState({
                  type: "setEnabled",
                  payload: false,
                })
              : setOpen(true)
          }
        >
          <Typography color="textPrimary">lastfm - {state.status}</Typography>
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>LastFM Config</DialogTitle>
        <DialogContent
          className={css`
            padding: ${theme.spacing(2)} ${theme.spacing(3)};
          `}
        >
          <TextField
            variant="standard"
            className={css`
              margin-bottom: ${theme.spacing(2)};
            `}
            label="Username"
            value={lastFmData.state.config.username || ""}
            onChange={e =>
              lastFmData.updateState({
                type: "setUsername",
                payload: e.target.value,
              })
            }
            fullWidth
          />
          <TextField
            variant="standard"
            label="API Key"
            type="password"
            value={lastFmData.state.config.token || ""}
            onChange={e =>
              lastFmData.updateState({
                type: "setToken",
                payload: e.target.value,
              })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions
          className={css`
            padding: ${theme.spacing(2)} ${theme.spacing(3)};
          `}
        >
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            className={css`
              margin-left: ${theme.spacing(2)} !important;
            `}
            onClick={() => {
              setOpen(false)
              lastFmData.replicateState({
                type: "setEnabled",
                payload: true,
              })
            }}
            color="primary"
            variant="contained"
          >
            Enable
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

render(Panel)
