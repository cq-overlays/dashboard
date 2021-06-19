import React from "react"
import { css } from "@emotion/css"
import { Button, Box, TextField, ButtonGroup } from "@material-ui/core"

import render, { RemoveRounded, AddRounded } from "../render"
import useCommentatorsReplicant, {
  Commentator,
} from "../hooks/useCommentatorsReplicant"
import Section from "../components/Section"

const Panel = () => {
  const [state, setState, replicateState, replicant] =
    useCommentatorsReplicant()

  return (
    <Box
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {state.map((_, index) => (
        <CommentatorSection
          key={index}
          state={state}
          index={index}
          setState={setState}
          replicateState={replicateState}
          replicant={replicant}
        />
      ))}
      <Box
        className={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <CommentatorButtons
          state={state}
          replicant={replicant}
          setState={setState}
          replicateState={replicateState}
        />
      </Box>
    </Box>
  )
}

const CommentatorButtons = ({ state, replicant, setState, replicateState }) => {
  React.useEffect(() => {
    if (state && replicant && state.length !== replicant.length) {
      replicateState()
    }
  }, [state])
  return (
    <ButtonGroup variant="text">
      <Button
        color="primary"
        onClick={() => setState({ type: "addCommentator" })}
      >
        <AddRounded />
      </Button>
      <Button
        color="secondary"
        onClick={() => setState({ type: "removeCommentator" })}
      >
        <RemoveRounded />
      </Button>
    </ButtonGroup>
  )
}

type SectionParams = {
  state: Array<Commentator>
  index: number
  setState: (action: any) => void
  replicateState: (action: any) => void
  replicant: Array<Commentator>
}

const CommentatorSection = ({
  state,
  index,
  setState,
  replicateState,
  replicant,
}: SectionParams) => {
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
  const isDisabled = () => {
    return JSON.stringify(commentator) === JSON.stringify(replicant?.[index])
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
          <Box
            className={css`
              display: flex;
            `}
          >
            <TextField
              value={commentator?.name || ""}
              onChange={e => setCommentator("name", e.target.value)}
              fullWidth
              label="Name"
            />
            <Box
              ml={1.5}
              className={css`
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
              `}
            >
              <Button
                onClick={() => replicateState({ index: index })}
                disabled={isDisabled()}
                variant="contained"
                color="primary"
              >
                {isDisabled() ? "Updated" : "Update"}
              </Button>
            </Box>
          </Box>
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
      </Box>
    </Section>
  )
}

render(Panel)
