import React from "react"
import { css } from "@emotion/css"
import { Box, Button, SvgIcon, TextField, Typography } from "@material-ui/core"
import render, { theme } from "../render"
import Section from "../components/Section"
import useMusic from "../hooks/useMusic"

const Panel = () => {
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
