import * as React from "react"
import { css } from "@emotion/core"
import { TextField, Button, Box } from "@material-ui/core"

import render from "../render"
import useReplicant from "../useReplicant"
import Section from "../Section"

render(() => {
  const [scene, setScene] = useReplicant("currentScene")

  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <SceneBox name="In-Game Scene" {...{ scene, setScene }} />
      <SceneBox name="Rosters Scene" {...{ scene, setScene }} />
      <SceneBox name="Maplist Scene" {...{ scene, setScene }} />
      <SceneBox name="BRB Scene" {...{ scene, setScene }} />
    </Box>
  )
})

const SceneBox = ({ name, scene, setScene }) => (
  <Section>
    <Box
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <span>{name}</span>
      <Button
        variant="contained"
        color="primary"
        disabled={name === scene}
        onClick={() => setScene(name)}
      >
        {name === scene ? "In Use" : "Switch"}
      </Button>
    </Box>
  </Section>
)
