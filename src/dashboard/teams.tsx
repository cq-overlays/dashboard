import React from "react"
import { css } from "@emotion/css"
import { Box, TextField, Button, SvgIcon, PropTypes } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import {
  AddRounded,
  RemoveRounded,
  FiberManualRecord as Circle,
} from "@material-ui/icons"
import render, { theme } from "../render"
import Section from "../components/Section"
import useTeamsReplicant, {
  TeamsState,
  TeamsReplicant,
  ActionTypes,
} from "../hooks/useTeamsReplicant"

const Panel = () => {
  const { teams, replicant, dispatch, replicate } = useTeamsReplicant()
  console.log(teams, replicant)

  return (
    <Box>
      <Section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Scoreboard {...{ teams, replicant, dispatch, replicate }} />
      </Section>
      <Section>
        <Nameboard {...{ teams, replicant, dispatch, replicate }} />
      </Section>
    </Box>
  )
}

type BoardProps = {
  teams: TeamsState
  replicant: TeamsReplicant
  dispatch: React.Dispatch<ActionTypes>
  replicate: Function
}

const Scoreboard = ({ teams, replicant, dispatch, replicate }: BoardProps) => {
  const dispatchScoreResetter = () => dispatch({ type: "resetScores" })
  React.useEffect(
    function replicateScore() {
      if (
        replicant &&
        (replicant[0].score !== teams.scoreA ||
          replicant[1].score !== teams.scoreB)
      ) {
        replicate([{ score: teams.scoreA }, { score: teams.scoreB }])
      }
    },
    [teams.scoreA, teams.scoreB]
  )

  return (
    <>
      <ScoreHalf
        {...{
          type: "A",
          score: teams.scoreA,
          color: teams.colors[0],
          dispatch,
        }}
      />
      <Button
        onClick={dispatchScoreResetter}
        className={css`
          font-size: ${theme.spacing(2)}px;
          min-width: ${theme.spacing(3.5)}px;
          min-height: ${theme.spacing(3.5)}px;
        `}
      >
        -
      </Button>
      <ScoreHalf
        {...{
          type: "B",
          score: teams.scoreB,
          color: teams.colors[1],
          dispatch,
        }}
        reversed={true}
      />
    </>
  )
}

const ScoreHalf = ({
  type,
  score,
  color,
  dispatch,
  reversed = false,
}: {
  type: string
  score: number
  color: string
  dispatch: Function
  reversed?: boolean
}) => {
  const dispatchScore = (score: number) =>
    dispatch({ type: `setScore${type}`, payload: score })

  const fragments = [
    <InkPreview color={color} key={`score${type}-ink`} />,
    <Box
      key={`score${type}-buttons`}
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      {[
        {
          key: `score${type}-buttons-inc`,
          color: "primary",
          icon: <AddRounded />,
          mut: (s: number) => s + 1,
        },
        {
          key: `score${type}-buttons-dec`,
          color: "secondary",
          icon: <RemoveRounded />,
          mut: (s: number) => s - 1,
        },
      ].map((props: any) => (
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
            onClick={() => dispatchScore(props.mut(score))}
          >
            {props.icon}
          </Button>
        </Box>
      ))}
    </Box>,
    <Box p={1.5} key={`score${type}-input`}>
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
  reversed && fragments.reverse()
  return <>{fragments.map(f => f)}</>
}

const Nameboard = ({ teams, replicant, dispatch, replicate }: BoardProps) => {
  const replicateNameboard = () =>
    replicate([
      { name: teams.nameA, color: teams.colors[0] },
      { name: teams.nameB, color: teams.colors[1] },
    ])

  const isUpdated = () =>
    replicant?.[0]?.name === teams.nameA &&
    replicant?.[1]?.name === teams.nameB &&
    replicant?.[0]?.color === teams.colors[0] &&
    replicant?.[1]?.color === teams.colors[1]

  return (
    <>
      <Box
        className={css`
          display: flex;
          align-items: flex-end;
          width: 100%;
        `}
      >
        <DropdownTeamName dispatch={dispatch} type="A" name={teams.nameA} />
        <Box ml={1.5} />
        <DropdownTeamName dispatch={dispatch} type="B" name={teams.nameB} />
      </Box>
      <Box mt={3}>
        <DropdownColors dispatch={dispatch} colors={teams.colors} />
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
          onClick={() => dispatch({ type: "swapColors" })}
        >
          Swap Colors
        </Button>
        <Box ml={1.5} />
        <Button
          variant="contained"
          color="primary"
          onClick={replicateNameboard}
          disabled={isUpdated()}
        >
          {isUpdated() ? "Updated" : "Update"}
        </Button>
      </Box>
    </>
  )
}

const DropdownColors = ({
  dispatch,
  colors,
}: {
  dispatch: Function
  colors: Array<string>
}) => {
  const dispatchColors = (event: unknown, newVal: ColorPair) => {
    dispatch({
      type: "setColors",
      payload: [newVal[0].value, newVal[1].value],
    })
  }

  type ColorPair = Array<{
    name: string
    value: string
  }>

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
      value={
        colorOptions.filter(o => colors.includes(o[0].value)).pop() || [
          { name: "Fork", value: "#E36D60" },
          { name: "Spoon", value: "#2FB89A" },
        ]
      }
      onChange={dispatchColors}
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

const DropdownTeamName = ({
  dispatch,
  type,
  name,
}: {
  dispatch: Function
  type: string
  name: string
}) => {
  const dispatchTeamName = (event: unknown, newVal: any) => {
    dispatch({
      type: `setName${type}`,
      payload: newVal,
    })
  }
  const teams = [
    "Xanadu",
    "Persistence",
    "Team Olive",
    "Geek Squids",
    "Twisted Time",
    "Ink Eye",
    "Red Sun",
    "Assault and Pepper",
    "Revitalize",
    "Kemistry",
    "HydroForces",
  ]

  return (
    <Dropdown
      options={teams}
      value={name}
      onChange={dispatchTeamName}
      getOptionSelected={(o: string): boolean => teams.includes(o)}
      name={`Team Name ${type}`}
    />
  )
}

const Dropdown = ({ name, options, ...rest }: any) => (
  <Autocomplete
    options={options}
    fullWidth
    autoHighlight
    disableClearable
    renderInput={params => <TextField {...params} label={name} />}
    {...rest}
  />
)

const InkPreview = ({ color }: { color: string }) => (
  <Box p={1.5}>
    <SvgIcon
      className={css`
        color: ${color};
        font-size: ${theme.spacing(5)}px;
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

const InkIcon = ({ color, ...rest }: { color: string }) => (
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
