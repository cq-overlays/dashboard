import * as React from "react"
import { css } from "@emotion/css"
import { Box, TextField, Button, InputLabel } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import AddRounded from "@material-ui/icons/AddRounded"
import RemoveRounded from "@material-ui/icons/RemoveRounded"

import render, { theme } from "../render"
import useReplicant from "../useReplicant"
import Section from "../Section"

const colors = [
  ["#25B100", "#571DB1"],
  ["#03B362", "#B1008D"],
  ["#0CAE6E", "#F75900"],
  ["#CE8003", "#9208B2"],
  ["#CE8003", "#9208B2"],
  ["#2922B5", "#5EB604"],
  ["#7B0393", "#43BA05"],
  ["#D9C100", "#007AC9"],
]

const Panel = () => {
  const [scoreA, setScoreA] = React.useState(0)
  const [scoreB, setScoreB] = React.useState(0)

  return (
    <Box>
      <Section>
        <SubSection title="Scores:">
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Score score={scoreA} setScore={setScoreA} left={true} />
            <Box>
              <Button
                onClick={() => {
                  setScoreA(0)
                  setScoreB(0)
                }}
                className={css`
                  font-size: ${theme.spacing(2)}px;
                  min-width: ${theme.spacing(3.5)}px;
                  min-height: ${theme.spacing(3.5)}px;
                `}
              >
                -
              </Button>
            </Box>
            <Score score={scoreB} setScore={setScoreB} left={false} />
          </Box>
        </SubSection>
        <SubSection title="Teams:">
          <Box
            className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <FakeAssBitchAssDropdown
              options={["a", "b", "f", "fa", "fb", "fc", "fg", "fn"]}
              name="Team A"
            />
            <Box mx={0.75} />
            <FakeAssBitchAssDropdown
              options={["a", "b", "f", "fa", "fb", "fc", "fg", "fn"]}
              name="Team B"
            />
          </Box>
        </SubSection>
        <SubSection title="Colors:">
          <Box
            className={css`
              padding-bottom: 40px;
            `}
          ></Box>
        </SubSection>
      </Section>
    </Box>
  )
}

const SubSection = ({ title, children }) => (
  <Box
    className={css`
      padding-bottom: ${theme.spacing(2)}px;
    `}
  >
    <InputLabel
      className={css`
        margin-bottom: ${theme.spacing(0.5)}px;
      `}
    >
      {title}
    </InputLabel>
    <Box p={1.5} bgcolor="grey.100">
      {children}
    </Box>
  </Box>
)

const Score = ({ left, score, setScore }) => {
  let elements = [
    <Box
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <ScoreButton score={score} setScore={setScore} inc={true} />
      <ScoreButton score={score} setScore={setScore} inc={false} />
    </Box>,
    <Box p={1.5}>
      <TextField
        className={css`
          input {
            padding: 0px;
            text-align: center;
            font-size: ${theme.spacing(6)}px;
            width: 1em;
          }
        `}
        value={score}
      />
    </Box>,
  ]
  elements = left ? elements : elements.reverse()

  return (
    <>
      {elements.map(elem => (
        <Box key={elements.indexOf(elem)}>{elem}</Box>
      ))}
    </>
  )
}

const ScoreButton = ({ inc, score, setScore }) => (
  <Box my={0.5}>
    <Button
      variant="contained"
      color={inc ? "primary" : "secondary"}
      onClick={() => (inc ? setScore(score + 1) : setScore(score - 1))}
      className={css`
        padding: ${theme.spacing(0)}px;
        font-size: ${theme.spacing(3)}px;
        min-width: ${theme.spacing(5)}px;
        min-height: ${theme.spacing(5)}px;
      `}
    >
      {inc ? <AddRounded /> : <RemoveRounded />}
    </Button>
  </Box>
)

const FakeAssBitchAssDropdown = ({ name, options }) => (
  <Autocomplete
    options={options}
    fullWidth
    autoHighlight
    renderInput={params => <TextField {...params} label={name} />}
  />
)

render(Panel)
