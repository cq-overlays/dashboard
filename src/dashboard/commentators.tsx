import React from "react"
import { css } from "@emotion/css"
import { Button, Box, TextField, IconButton } from "@material-ui/core"

import render, { RemoveRounded, theme } from "../render"
import useCommentatorsReplicant, {
  Commentator,
} from "../hooks/useCommentatorsReplicant"
import Section from "../components/Section"

const Panel = () => {
  const [
    state,
    setState,
    replicateState,
    replicant,
  ] = useCommentatorsReplicant()

  return (
    <Box
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <CommentatorSection state={state} index={0} setState={setState} />
      <CommentatorSection state={state} index={1} setState={setState} />
    </Box>
  )
}

type SectionParams = {
  state: Array<Commentator>
  index: number
  setState: (action: any) => void
}

const CommentatorSection = ({ state, index, setState }: SectionParams) => {
  const commentator = state[index]
  const setCommentator = (type: string, payload: string) => {
    switch (type) {
      case "name":
        return setState({ type: "setName", index, payload })
      case "twitter":
        return setState({ type: "setTwitter", index, payload })
      case "pronouns":
        return setState({ type: "setPronouns", index, payload })
    }
  }

  return (
    <Section>
      <Box
        className={css`
          display: flex;
          align-items: stretch;
        `}
      >
        <Box
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <TextField
            value={commentator?.name || ""}
            onChange={e => setCommentator("name", e.target.value)}
            fullWidth
            label="Name"
          />
          <Box
            mt={3}
            className={css`
              display: flex;
            `}
          >
            <TextField
              value={commentator?.twitter || ""}
              onChange={e => setCommentator("twitter", e.target.value)}
              fullWidth
              label="Twitter"
            />
            <Box ml={1.5} />
            <TextField
              value={commentator?.pronouns || ""}
              onChange={e => setCommentator("pronouns", e.target.value)}
              fullWidth
              label="Pronouns"
            />
          </Box>
        </Box>
        <Box
          ml={1.5}
          className={css`
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          `}
        >
          {/* <Button variant="outlined" color="secondary">
            Remove
          </Button>
          <Box mt={1.5} /> */}
          <Button variant="contained" color="primary">
            Update
          </Button>
        </Box>
      </Box>
    </Section>
  )
}

render(Panel)
