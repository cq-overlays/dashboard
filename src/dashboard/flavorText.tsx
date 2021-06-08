import React from "react"
import { css } from "@emotion/css"
import { Button, Box, TextField } from "@material-ui/core"

import render from "../render"
import useFlavorTextReplicant from "../hooks/useFlavorTextReplicant"
import Section from "../components/Section"

const Panel = () => {
  const [state, setState, replicateState, replicant]: any =
    useFlavorTextReplicant()
  const isDisabled = () => {
    return state === replicant
  }

  return (
    <Section>
      <Box
        className={css`
          display: flex;
          align-items: flex-end;
        `}
      >
        <TextField
          value={state || ""}
          onChange={d => setState(d.target.value)}
          label="Flavor Text"
          fullWidth
        />
        <Box ml={1.5}>
          <Button
            onClick={() => replicateState()}
            variant="contained"
            disabled={isDisabled()}
            color="primary"
          >
            {isDisabled() ? "Updated" : "Update"}
          </Button>
        </Box>
      </Box>
    </Section>
  )
}

render(Panel)
