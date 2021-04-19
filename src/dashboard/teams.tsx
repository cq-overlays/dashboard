import * as React from "react"
import { css } from "@emotion/css"
import { Box, TextField, Button, SvgIcon } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import {
  AddRounded,
  RemoveRounded,
  FiberManualRecord as Circle,
  CropSquare,
} from "@material-ui/icons"
import render, { theme } from "../render"
import Section from "../Section"
import useReplicant from "../useReplicant"

const useTeams = () => {
  // React.useReducer

  const [colorPair, setColorPair] = React.useState(["#e36d60", "#2fb89a"])
  const [scoreA, setScoreA] = React.useState(0)
  const [scoreB, setScoreB] = React.useState(0)
  const swapColorPair = () => {
    setColorPair(colorPair.reverse())
  }
}

const Panel = () => {
  return (
    <Box>
      <Section>
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
      </Section>
      <Section>
        <Box
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          `}
        >
          <InkPreview color={colorPair[0]} />
          <Box
            px={1.5}
            className={css`
              display: flex;
              align-items: flex-end;
              width: 100%;
            `}
          >
            <Dropdown
              options={["a", "b", "f", "fa", "fb", "fc", "fg", "fn"]}
              name="Team Name A"
            />
            <Box ml={1.5} />
            <Dropdown
              options={["a", "b", "f", "fa", "fb", "fc", "fg", "fn"]}
              name="Team Name B"
            />
          </Box>
          <InkPreview color={colorPair[1]} />
        </Box>
        <Box mt={3}>
          <Dropdown
            options={colorPairOptions}
            getOptionLabel={o => `${o[0].name} vs ${o[1].name}`}
            renderOption={o => (
              <>
                <InkIcon color={o[0].value} />
                {` ${o[0].name} vs ${o[1].name} `}
                <InkIcon color={o[1].value} />
              </>
            )}
            name="Team Colors"
          />
        </Box>
        <Box
          mt={3}
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          `}
        >
          <Button
            className={css`
              white-space: nowrap;
            `}
            variant="outlined"
          >
            Swap Colors
          </Button>
          <Box ml={1.5} />
          <Button
            variant="contained"
            color="primary"
            disabled={true === false}
            onClick={() => {}}
          >
            {true === false ? "Updated" : "Update"}
          </Button>
        </Box>
      </Section>
    </Box>
  )
}

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

const Dropdown = ({ name, options, ...rest }) => (
  <Autocomplete
    options={options}
    {...rest}
    fullWidth
    autoHighlight
    renderInput={params => <TextField {...params} label={name} />}
  />
)

const InkPreview = ({ color }) => (
  <Box>
    <SvgIcon
      className={css`
        color: ${color};
        font-size: ${theme.spacing(4)}px;
        vertical-align: text-bottom;
      `}
    >
      <circle
        className={css`
          stroke: white;
          stroke-width: 2;
        `}
        cx="12"
        cy="12"
        r="11"
      />
    </SvgIcon>
  </Box>
)

const InkIcon = ({ color, ...rest }) => (
  <Circle
    className={css`
      color: ${color};
      circle {
        stroke: white;
        stroke-width: 2;
      }
    `}
    {...rest}
  />
)

render(Panel)
