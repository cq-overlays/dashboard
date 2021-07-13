import React from "react"
import { css } from "@emotion/css"
import { Box, Button, TextField } from "@material-ui/core"
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
          justify-content: flex-end;
        `}
      >
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

render(Panel)
