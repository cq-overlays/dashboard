import React from "react"
import { css } from "@emotion/css"
import { Box, TextField, Button, SvgIcon } from "@material-ui/core"
import render, { theme, AddRounded, RemoveRounded } from "../render"
import Section from "../components/Section"
import Dropdown from "../components/Dropdown"
import { ReplicantReturnType } from "../hooks/useReplicant"
import useTeams from "../hooks/useTeams"
import useScores from "../hooks/useScores"
import useColors, { Colors } from "../hooks/useColors"
import useMapWinners from "../hooks/useMapWinners"
import useLoadedData, { LoadedData } from "../hooks/useLoadedData"

const Panel = () => {
  const loadedData = useLoadedData()
  const colors = useColors()
  return (
    <Box>
      <Scores colors={colors} />
      <Nameboard colors={colors} loadedData={loadedData.state} />
    </Box>
  )
}

const Scores = ({ colors }: { colors: ReplicantReturnType<Colors> }) => {
  const [prevOrder, setPrevOrder] = React.useState([] as string[])
  const scores = useScores()
  const mapWinners = useMapWinners()
  const teams = useTeams()

  // Automatically set map winners when scores are changed
  React.useEffect(() => {
    if (scores.replicant && mapWinners.replicant) {
      const scoreOrder: string[] = [...prevOrder]
      const count = [0, 0]
      prevOrder.forEach((score: string) => {
        if (score === "A") {
          count[0]++
        } else if (score === "B") {
          count[1]++
        }
      })
      count[0] = scores.state[0] - count[0]
      count[1] = scores.state[1] - count[1]
      ;["A", "B"].forEach((char, index) => {
        for (let i = 0; i < Math.abs(count[index]); i++) {
          if (count[index] > 0) {
            scoreOrder.push(char)
          } else {
            scoreOrder.splice(scoreOrder.lastIndexOf(char), 1)
          }
        }
      })
      if (mapWinners.replicant.length !== scoreOrder.length) {
        setPrevOrder(scoreOrder)
        console.log("EEEEE", scoreOrder)
        mapWinners.replicateState({
          payload: scoreOrder.map((char, index) =>
            char === "A" ? teams.state[0].name : teams.state[1].name
          ),
        })
      }
    }
  }, [scores.state, teams.state])

  return (
    <Section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScoreHalf
        value={scores.state[0]}
        handleScore={(mut: number) =>
          scores.replicateState({ type: "A", payload: scores.state[0] + mut })
        }
        color={colors.state[0]}
      />
      <Box p={1.5}>
        <Button
          onClick={() => scores.replicateState({ type: "reset" })}
          className={css`
            font-size: ${theme.spacing(2)}px;
            min-width: ${theme.spacing(3.5)}px;
            min-height: ${theme.spacing(3.5)}px;
          `}
        >
          -
        </Button>
      </Box>
      <ScoreHalf
        value={scores.state[1]}
        handleScore={(mut: number) =>
          scores.replicateState({ type: "B", payload: scores.state[1] + mut })
        }
        color={colors.state[1]}
        reversed={true}
      />
    </Section>
  )
}

type ScoreHalfProps = {
  value: number
  handleScore: Function
  color: string
  reversed?: boolean
}

const ScoreHalf = ({
  value,
  handleScore,
  color,
  reversed = false,
}: ScoreHalfProps) => (
  <Box
    className={css`
      display: flex;
      align-items: center;
      flex-direction: ${reversed ? "row-reverse" : "row"};
      gap: ${theme.spacing(1.5)}px;
    `}
  >
    <Ink color={color} size={5} />
    <Box
      className={css`
        display: flex;
        flex-direction: column;
        gap: ${theme.spacing(1)}px;
      `}
    >
      {[
        {
          color: "primary",
          icon: <AddRounded />,
          mut: 1,
        },
        {
          color: "secondary",
          icon: <RemoveRounded />,
          mut: -1,
        },
      ].map((props, index) => (
        <Box key={index}>
          <Button
            className={css`
              padding: ${theme.spacing(0)}px;
              font-size: ${theme.spacing(3)}px;
              min-width: ${theme.spacing(5)}px;
              min-height: ${theme.spacing(5)}px;
            `}
            variant="contained"
            color={props.color as "primary" | "secondary"}
            onClick={() => handleScore(props.mut)}
          >
            {props.icon}
          </Button>
        </Box>
      ))}
    </Box>
    <TextField
      className={css`
        input {
          padding: 0px;
          text-align: center;
          font-size: ${theme.spacing(6)}px;
          width: 1em;
        }
      `}
      value={value}
    />
  </Box>
)

type NameboardProps = {
  loadedData: LoadedData
  colors: ReplicantReturnType<Colors>
}

const Nameboard = ({ loadedData, colors }: NameboardProps) => {
  const teams = useTeams()

  const createChangeHandler =
    (type: "A" | "B") => (event: unknown, newVal: string) =>
      teams.updateState({
        type,
        payload: {
          name: newVal,
          roster: loadedData.teams[newVal],
        },
      })

  const isUpdated = () =>
    JSON.stringify(teams.replicant) === JSON.stringify(teams.state) &&
    JSON.stringify(colors.replicant) === JSON.stringify(colors.state)

  return (
    <Section>
      <Box
        className={css`
          display: flex;
          align-items: flex-end;
          width: 100%;
        `}
      >
        <Dropdown
          freeSolo
          options={Object.keys(loadedData.teams) || {}}
          value={teams.state[0].name}
          onChange={createChangeHandler("A")}
          name="Team Alpha"
        />
        <Box ml={1.5} />
        <Dropdown
          freeSolo
          options={Object.keys(loadedData.teams) || {}}
          value={teams.state[1].name}
          onChange={createChangeHandler("B")}
          name="Team Bravo"
        />
      </Box>
      <Box mt={3}>
        {" "}
        <DropdownColors
          updateState={colors.updateState}
          state={colors.state}
          colors={loadedData.colors}
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
          onClick={() => colors.updateState({ type: "swap" })}
        >
          Swap Colors
        </Button>
        <Box ml={1.5} />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            teams.replicateState()
            colors.replicateState()
          }}
          disabled={isUpdated()}
        >
          {isUpdated() ? "Updated" : "Update"}
        </Button>
      </Box>
    </Section>
  )
}

type DropdownColorsProps = {
  updateState: ReplicantReturnType<Colors>["updateState"]
  state: ReplicantReturnType<Colors>["state"]
  colors: LoadedData["colors"]
}

const DropdownColors = ({
  updateState,
  state,
  colors,
}: DropdownColorsProps) => {
  const getPairFromValue = (value: ReplicantReturnType<Colors>["state"]) =>
    colors.find(
      pair => value.includes(pair[0].value) && value.includes(pair[1].value)
    )

  return (
    <Dropdown
      options={colors.map(pair => [pair[0].value, pair[1].value]) || []}
      value={state}
      onChange={(event: unknown, newVal: Colors) =>
        updateState({
          type: "set",
          payload: newVal,
        })
      }
      getOptionSelected={(o: Colors, v: Colors) =>
        JSON.stringify(o) === JSON.stringify(v)
      }
      getOptionLabel={(o: Colors) => {
        const pair = getPairFromValue(o)
        return `${pair?.[0].name} vs ${pair?.[1].name}`
      }}
      renderOption={(o: Colors) => {
        const pair = getPairFromValue(o)
        return (
          <Box
            className={css`
              display: flex;
              align-items: center;
              gap: ${theme.spacing(0.5)}px;
            `}
          >
            <Ink color={pair?.[0].value || "transparent"} size={2} />
            {`${pair?.[0].name} vs ${pair?.[1].name}`}
            <Ink color={pair?.[1].value || "transparent"} size={2} />
          </Box>
        )
      }}
      name="Team Colors"
    />
  )
}

type InkProps = {
  color: string
  size: number
}

const Ink = ({ color, size }: InkProps) => (
  <SvgIcon
    className={css`
      color: ${color};
      ${size && `font-size: ${theme.spacing(size)}px;`}
    `}
  >
    <circle
      className={css`
        stroke: white;
        stroke-width: 2;
      `}
      cx="50%"
      cy="50%"
      r="10"
    />
  </SvgIcon>
)

render(Panel)
