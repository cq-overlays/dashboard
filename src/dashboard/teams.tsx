import * as React from "react"
import { css } from "@emotion/css"
import { Box, TextField, Button, SvgIcon } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import {
  AddRounded,
  RemoveRounded,
  FiberManualRecord as Circle,
} from "@material-ui/icons"
import render, { theme } from "../render"
import Section from "../components/Section"
import useTeamsReplicant from "../hooks/useTeamsReplicant"

const Panel = () => {
  return (
    <Box>
      <Section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Scoreboard {...{ teams, dispatch, replicate }} />
      </Section>
      <Section>
        <Nameboard {...{ teams, dispatch, replicate, replicant }} />
      </Section>
    </Box>
  )
}

const Scoreboard = ({ teams, dispatch, replicate }) => (
  <>
    <ScoreHalf
      type="scoreA"
      score={teams.scoreA}
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
    />
    <Button
      className={css`
        font-size: ${theme.spacing(2)}px;
        min-width: ${theme.spacing(3.5)}px;
        min-height: ${theme.spacing(3.5)}px;
      `}
    >
      -
    </Button>
    <ScoreHalf
      type="scoreB"
      score={teams.scoreB}
      replicate={replicate}
      reversed={true}
    />
  </>
)

const Nameboard = ({ teams, dispatch, replicate, replicant }) => {
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
  return (
    <>
      <Box
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        `}
      >
        <InkPreview color={teams.colors[0]} />
        <Box
          px={1.5}
          className={css`
            display: flex;
            align-items: flex-end;
            width: 100%;
          `}
        >
          <Dropdown
            name="Team Name A"
            options={["a", "b", "f", "fa", "fb", "fc", "fg", "fn"]}
          />
          <Box ml={1.5} />
          <Dropdown
            name="Team Name B"
            options={["a", "b", "f", "fa", "fb", "fc", "fg", "fn"]}
          />
        </Box>
        <InkPreview color={teams.colors[1]} />
      </Box>
      <Box mt={3}>
        <DropdownColors dispatch={dispatch} />
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
          variant="outlined"
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
        >
          Swap Colors
        </Button>
        <Box ml={1.5} />
        <Button
          variant="contained"
          color="primary"
          disabled={isUpdated()}
            disabled={true === false}
            onClick={() => {}}
          >
        >
          {isUpdated() ? "Updated" : "Update"}
        </Button>
      </Box>
    </>
  )
}

const ScoreHalf = ({ type, score, replicate, handler, reversed = false }) => {
  type ButtonProps = {
    key: string
    color: "primary" | "secondary"
    icon: any
    mut: any
  }
  const fragments = [
    <Box
      key={`${type}-buttons`}
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {[
        {
          key: `${type}-inc`,
          color: "primary",
          icon: <AddRounded />,
          mut: () => {
            handler(score + 1)
          },
        },
        {
          key: `${type}-dec`,
          color: "secondary",
          icon: <RemoveRounded />,
          mut: () => {
            handler(score - 1)
          },
        },
      ].map((props: ButtonProps) => (
        <Box my={0.5} key={props.key}>
          <Button
            className={css`
              padding: ${theme.spacing(0)}px;
              font-size: ${theme.spacing(3)}px;
              min-width: ${theme.spacing(5)}px;
              min-height: ${theme.spacing(5)}px;
            `}
            variant="contained"
            color={props.color}
            onClick={props.mut}
          >
            {props.icon}
          </Button>
        </Box>
      ))}
    </Box>,
    <Box p={1.5} key={`${type}-input`}>
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
  if (reversed) {
    fragments.reverse()
  }
  return <>{fragments.map(f => f)}</>
}

const DropdownColors = ({ dispatch }) => {
  type Color = {
    name: string
    value: string
  }
  type ColorPair = Array<Color>

  const colorOptions: Array<ColorPair> = [
    [
      { name: "Slimy Green", value: "#25B100" },
      { name: "Grape", value: "#571DB1" },
    ],
    [
      { name: "Winter Green", value: "#03B362" },
      { name: "Dark Magenta", value: "#B1008D" },
    ],
    [
      { name: "Turquoise", value: "#0CAE6E" },
      { name: "Pumpkin", value: "#F75900" },
    ],
    [
      { name: "Mustard", value: "#CE8003" },
      { name: "Purple", value: "#9208B2" },
    ],
    [
      { name: "Blue", value: "#2922B5" },
      { name: "Green", value: "#5EB604" },
    ],
    [
      { name: "Rich Purple", value: "#7B0393" },
      { name: "Green Apple", value: "#43BA05" },
    ],
    [
      { name: "Yellow", value: "#D9C100" },
      { name: "True Blue", value: "#007AC9" },
    ],
  ]

  return (
    <Dropdown
      options={colorOptions}
      getOptionSelected={(o: ColorPair): boolean => colorOptions.includes(o)}
      getOptionLabel={(o: ColorPair) => `${o[0].name} vs ${o[1].name}`}
      renderOption={(o: ColorPair) => (
        <>
          <InkIcon color={o[0].value} />
          {` ${o[0].name} vs ${o[1].name} `}
          <InkIcon color={o[1].value} />
        </>
      )}
      name="Team Colors"
    />
  )
}

const Dropdown = ({ name, options, ...rest }) => (
  <Autocomplete
    options={options}
    fullWidth
    autoHighlight
    disableClearable
    renderInput={params => <TextField {...params} label={name} />}
    {...rest}
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
