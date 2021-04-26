import React from "react"
import { css } from "@emotion/css"
import { Button, Box, TextField } from "@material-ui/core"

import render from "../render"
import useFlavorTextReplicant from "../hooks/useFlavorTextReplicant"
import Section from "../components/Section"

const Panel = () => {
  const [state, setState, , replicant]: any = useFlavorTextReplicant()

  const flavorTextRef = React.useRef()
  const submit = () => {
    setState(flavorTextRef.current.value)
  }

  return (
    <Section>
      <form onSubmit={submit}>
        <Box
          className={css`
            display: flex;
            align-items: flex-end;
          `}
        >
          <TextField
            label="Flavor Text"
            fullWidth
            inputProps={{ ref: flavorTextRef }}
          />
          <Box ml={1.5}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Section>
  )
}

render(Panel)
