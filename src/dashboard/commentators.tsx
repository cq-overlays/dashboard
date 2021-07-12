import React from "react"
import { css } from "@emotion/css"
import { Box, TextField } from "@material-ui/core"

import render from "../render"
import Section from "../components/Section"
import ArrayStatePanel from "../components/ArrayStatePanel"
import useCommentators, { Commentators } from "../hooks/useCommentators"
import useLoadedData from "../hooks/useLoadedData"
import { ReplicantReturnType } from "../hooks/useReplicant"

const Panel = () => {
  const commentators = useCommentators()
  const loadedData = useLoadedData()

  return (
    <ArrayStatePanel
      hook={commentators}
      name="Block"
      options={Object.keys(loadedData.state.blocks)}
      getOptionValue={option => loadedData.state.blocks[option]}
    >
      {index => (
        <CommentatorSection
          key={index}
          index={index}
          commentators={commentators}
        />
      )}
    </ArrayStatePanel>
  )
}

type CommentatorSectionProps = {
  index: number
  commentators: ReplicantReturnType<Commentators>
}

const CommentatorSection = ({
  index,
  commentators,
}: CommentatorSectionProps) => {
  const commentator = commentators.state[index]
  const setCommentator = (type: string, payload: string) => {
    switch (type) {
      case "name":
        return commentators.updateState({
          type: "update",
          payload: { index, value: { name: payload } },
        })
      case "twitter":
        return commentators.updateState({
          type: "update",
          payload: { index, value: { twitter: payload } },
        })
      case "pronouns":
        return commentators.updateState({
          type: "update",
          payload: { index, value: { pronouns: payload } },
        })
    }
  }
  return (
    <Section key={index}>
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
