import React from "react"
import { css } from "@emotion/css"
import { Button, Box } from "@material-ui/core"

import render, { theme } from "../render"
import useSceneReplicant from "../hooks/useSceneReplicant"
import Section from "../components/Section"

const Panel = () => {
  const [scene, setScene] = useSceneReplicant()

  return (
    <Box
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <SceneBox name="Scores Scene" {...{ scene, setScene }} />
      <SceneBox name="Maplist Scene" {...{ scene, setScene }} />
      <SceneBox name="Rosters Scene" {...{ scene, setScene }} />
      <SceneBox name="BRB Scene" {...{ scene, setScene }} />
      <Box
        className={css`
          margin-top: -${theme.spacing(1.5)}px;
        `}
      />
    </Box>
  )
}

const SceneBox = ({
  name,
  scene,
  setScene,
}: {
  name: string
  scene: string
  setScene: Function
}) => (
  <Section>
    <Box
      className={css`
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
        {name === scene ? "Active" : "Switch"}
      </Button>
    </Box>
  </Section>
)

render(Panel)
