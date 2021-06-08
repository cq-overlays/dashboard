import React from "react"
import { css } from "@emotion/css"
import { Button, Box, TextField } from "@material-ui/core"

import render from "../render"
import useFlavorTextReplicant from "../hooks/useFlavorTextReplicant"
import Section from "../components/Section"

const Panel = () => {
  const [state, setState, replicateState]: any = useFlavorTextReplicant()

  return (
    <Section>
      <Box
        className={css`
          display: flex;
          align-items: flex-end;
        `}
      >
        <Field
          state={state}
          setState={setState}
          replicateState={replicateState}
        />
      </Box>
    </Section>
  )
}

const Field = ({ state, setState, replicateState }: any) => {
  return (
    <>
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
          color="primary"
        >
          Update
        </Button>
      </Box>
    </>
  )
}

render(Panel)
