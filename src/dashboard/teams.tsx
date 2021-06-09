import React from "react"
import { css } from "@emotion/css"
import { Box, TextField, Button, SvgIcon } from "@material-ui/core"
import render, { theme, AddRounded, RemoveRounded } from "../render"
import Section from "../components/Section"
import Dropdown from "../components/Dropdown"
import useTeamsReplicant, {
  TeamsState,
  TeamsReplicant,
  ColorState,
} from "../hooks/useTeamsReplicant"
import useLoadedDataReplicant, {
  ColorPair,
  LoadedData,
} from "../hooks/useLoadedDataReplicant"
import useMapsReplicant from "../hooks/useMapsReplicant"

const Panel = () => {
  const [state, updateState, replicateState, replicant] = useTeamsReplicant()
  const [loadedData] = useLoadedDataReplicant()
  const [, , replicateMaps] = useMapsReplicant()
  const [scoreOrder, setScoreOrder]: any = React.useState([])
  const orderScores = () => {
    // Set score order
    const newScoreOrder: string[] = [...scoreOrder]
    const count = [0, 0]
    scoreOrder.forEach((score: string) => {
      if (score === "A") {
        count[0]++
      } else if (score === "B") {
        count[1]++
      }
    })
    count[0] = state.scoreA - count[0]
    count[1] = state.scoreB - count[1]
    ;["A", "B"].forEach((char, index) => {
      for (let i = 0; i < Math.abs(count[index]); i++) {
        if (count[index] > 0) {
          newScoreOrder.push(char)
        } else {
          newScoreOrder.splice(newScoreOrder.lastIndexOf(char), 1)
        }
      }
    })
    setScoreOrder(newScoreOrder)
    // Auto-score map winners
    newScoreOrder.forEach((score, index) => {
      replicateMaps({ type: "winner", index, payload: score })
    })
    // Replicate
    replicateState({ type: "score" })
  }

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
          leftHalf={
            <ScoreHalf
              {...{
                type: "A",
                score: state.scoreA,
                color: state.colors[0],
                updateState,
              }}
            />
          }
          rightHalf={
            <ScoreHalf
              {...{
                type: "B",
                score: state.scoreB,
                color: state.colors[1],
                updateState,
              }}
              reversed={true}
            />
          }
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
          dropdownA={
            <DropdownName
              updateState={updateState}
              type="A"
              name={state.nameA}
              loadedData={loadedData}
            />
          }
          dropdownB={
            <DropdownName
              updateState={updateState}
              type="B"
              name={state.nameB}
              loadedData={loadedData}
            />
          }
          dropdownC={
            <DropdownColors
              updateState={updateState}
              colors={state.colors}
              loadedData={loadedData}
            />
          }
        />
      </Section>
    </Box>
  )
}

type BoardProps = {
  state: TeamsState
  updateState: React.Dispatch<any>
  replicant: TeamsReplicant
  replicateState: Function
  loadedData?: LoadedData
  leftHalf: React.ReactFragment
  rightHalf: React.ReactFragment
}

const Scoreboard = ({
  state,
  updateState,
  replicateState,
  replicant,
  leftHalf,
  rightHalf,
}: BoardProps) => {
  const resetScores = () => updateState({ type: "resetScores" })
  React.useEffect(() => {
    if (replicant) {
      replicateState({ type: "score" })
    }
  }, [state.scoreA, state.scoreB])

  return (
    <>
      {leftHalf}
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
      {rightHalf}
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

type NameboardProps = {
  state: TeamsState
  updateState: React.Dispatch<any>
  replicateState: Function
  replicant: TeamsReplicant
  dropdownA: React.ReactFragment
  dropdownB: React.ReactFragment
  dropdownC: React.ReactFragment
}

const Nameboard = ({
  state,
  updateState,
  replicateState,
  replicant,
  dropdownA,
  dropdownB,
  dropdownC,
}: NameboardProps) => {
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
        {dropdownA}
        <Box ml={1.5} />
        {dropdownB}
      </Box>
      <Box mt={3}>{dropdownC}</Box>
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
  const updateColors = (event: unknown, newVal: ColorPair) =>
    updateState({
      type: "setColors",
      payload: newVal,
    })

  const colorPairFromState = (colors: ColorState) =>
    loadedData?.colorlist.find(
      (pair: ColorPair) =>
        colors.includes(pair[0].value) && colors.includes(pair[1].value)
    )

  return (
    <Dropdown
      options={loadedData?.colorlist
        .map((pair: ColorPair) => [pair[0].value, pair[1].value])
        .slice(0, -1)}
      value={colors}
      onChange={updateColors}
      getOptionSelected={(o: ColorState, v: ColorState) =>
        JSON.stringify(o) === JSON.stringify(v)
      }
      getOptionLabel={(o: ColorState) => {
        const pair = colorPairFromState(o)
        return `${pair?.[0].name} vs ${pair?.[1].name}`
      }}
      renderOption={(o: ColorState) => {
        const pair = colorPairFromState(o)
        return (
          <>
            <InkIcon color={pair?.[0].value || "transparent"} />
            {` ${pair?.[0].name} vs ${pair?.[1].name} `}
            <InkIcon color={pair?.[1].value || "transparent"} />
          </>
        )
      }}
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

  return (
    <Dropdown
      freeSolo
      options={Object.keys(loadedData?.teamlist || {})}
      value={name}
      onChange={updateName}
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

const InkIcon = ({ color }: { color: string }) => (
  <SvgIcon
    className={css`
      color: ${color};
    `}
  >
    <circle
      className={css`
        stroke: white;
        stroke-width: 2;
      `}
      cx="12"
      cy="12"
      r="8"
    />
  </SvgIcon>
)

render(Panel)
