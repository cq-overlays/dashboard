import React from "react"
import { css } from "@emotion/css"
import { Box, TextField, Button, SvgIcon } from "@material-ui/core"
import {
  AddRounded,
  RemoveRounded,
  FiberManualRecord as Circle,
} from "@material-ui/icons"
import render, { theme } from "../render"
import Section from "../components/Section"
import Dropdown from "../components/Dropdown"
import useTeamsReplicant, {
  TeamsState,
  TeamsReplicant,
} from "../hooks/useTeamsReplicant"
import useLoadedDataReplicant, {
  ColorPair,
  LoadedData,
} from "../hooks/useLoadedDataReplicant"

const Panel = () => {
  const [
    state,
    updateState,
    replicateState,
    replicant,
  ]: any = useTeamsReplicant()
  const [loadedData] = useLoadedDataReplicant()

  return (
    <Box>
      <Section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Scoreboard
          {...{
            state,
            updateState,
            replicateState,
            replicant,
          }}
        />
      </Section>
      <Section>
        <Nameboard
          {...{
            state,
            updateState,
            replicateState,
            replicant,
            loadedData,
          }}
        />
      </Section>
    </Box>
  )
}

type BoardProps = {
  state: TeamsState
  updateState: React.Dispatch<any>
  replicateState: Function
  replicant: TeamsReplicant
  loadedData?: LoadedData
}

const Scoreboard = ({
  state,
  updateState,
  replicateState,
  replicant,
}: BoardProps) => {
  const resetScores = () => updateState({ type: "resetScores" })
  React.useEffect(
    function replicateScores() {
      if (replicant) {
        console.log("Running score effect")
        replicateState({ type: "score" })
      }
    },
    [state.scoreA, state.scoreB]
  )

  return (
    <>
      <ScoreHalf
        {...{
          type: "A",
          score: state.scoreA,
          color: state.colors[0],
          updateState,
        }}
      />
      <Button
        onClick={resetScores}
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
          score: state.scoreB,
          color: state.colors[1],
          updateState,
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
  updateState,
  reversed = false,
}: {
  type: string
  score: number
  color: string
  updateState: Function
  reversed?: boolean
}) => {
  const updateScore = (score: number) =>
    updateState({ type: `setScore${type}`, payload: score })

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
            onClick={() => updateScore(props.mut(score))}
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

const Nameboard = ({
  state,
  updateState,
  replicateState,
  replicant,
  loadedData,
}: BoardProps) => {
  const replicateNameboard = () => replicateState({ type: "name" })
  const isUpdated = () =>
    replicant?.[0]?.name === state.nameA &&
    replicant?.[1]?.name === state.nameB &&
    replicant?.[0]?.color === state.colors[0] &&
    replicant?.[1]?.color === state.colors[1]

  return (
    <>
      <Box
        className={css`
          display: flex;
          align-items: flex-end;
          width: 100%;
        `}
      >
        <DropdownName
          updateState={updateState}
          type="A"
          name={state.nameA}
          loadedData={loadedData}
        />
        <Box ml={1.5} />
        <DropdownName
          updateState={updateState}
          type="B"
          name={state.nameB}
          loadedData={loadedData}
        />
      </Box>
      <Box mt={3}>
        <DropdownColors
          updateState={updateState}
          colors={state.colors}
          loadedData={loadedData}
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
          variant="outlined"
          className={css`
            white-space: nowrap;
          `}
          onClick={() => updateState({ type: "swapColors" })}
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
  updateState,
  colors,
  loadedData,
}: {
  updateState: Function
  colors: Array<string>
  loadedData?: LoadedData
}) => {
  const updateColors = (event: unknown, newVal: ColorPair) => {
    updateState({
      type: "setColors",
      payload: [newVal[0].value, newVal[1].value],
    })
  }

  let colorlist: Array<ColorPair>
  if (loadedData?.colorlist) {
    colorlist = loadedData.colorlist
  } else {
    colorlist = []
  }

  return (
    <Dropdown
      options={colorlist}
      value={
        colorlist.filter(o => colors.includes(o[0].value)).pop() || [
          { name: "Fork", value: "#E36D60" },
          { name: "Spoon", value: "#2FB89A" },
        ]
      }
      onChange={updateColors}
      getOptionSelected={(o: ColorPair): boolean => colorlist.includes(o)}
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

const DropdownName = ({
  updateState,
  type,
  name,
  loadedData,
}: {
  updateState: Function
  type: string
  name: string
  loadedData?: LoadedData
}) => {
  const updateName = (event: unknown, newVal: any) => {
    updateState({
      type: `setName${type}`,
      payload: newVal,
    })
  }

  let teams: Array<string>
  if (loadedData?.teamlist) {
    teams = Object.keys(loadedData.teamlist)
  } else {
    teams = []
  }

  return (
    <Dropdown
      options={teams}
      value={name}
      onChange={updateName}
      getOptionSelected={(o: string): boolean => teams.includes(o)}
      name={`Team Name ${type}`}
    />
  )
}

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
