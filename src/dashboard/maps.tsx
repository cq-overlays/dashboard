import React from "react"
import { css } from "@emotion/css"
import { Button, Box } from "@material-ui/core"

import render, { theme } from "../render"
import useMapsReplicant from "../hooks/useMapsReplicant"
import Section from "../components/Section"

const Panel = () => {
  const [
    state,
    updateState,
    replicateState,
    replicant,
  ]: any = useMapsReplicant()

  return (
    <Box>
      <Section>
        <Button
          variant="contained"
          color="primary"
          onClick={() => replicateState()}
        >
          Update
        </Button>
      </Section>
    </Box>
  )
}

render(Panel)
