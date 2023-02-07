import { css } from "@emotion/css"
import { Box, Button, ButtonGroup, InputLabel } from "@mui/material"
import ArrayStatePanel from "../components/ArrayStatePanel"
import Dropdown from "../components/Dropdown"
import Section from "../components/Section"
import useLoadedData from "../hooks/useLoadedData"
import useMapWinners from "../hooks/useMapWinners"
import { ReplicantReturnType } from "../hooks/useReplicant"
import useRound, { Round } from "../hooks/useRound"
import useTeams from "../hooks/useTeams"
import render from "../render"

const Panel = () => {
  const round = useRound()
  const loadedData = useLoadedData()

  return (
    <ArrayStatePanel
      hook={round}
      name="Round"
      options={Object.keys(loadedData.state.rounds)}
      getOptionValue={option => loadedData.state.rounds[option]}
    >
      {index => (
        <GameSection
          key={index}
          index={index}
          options={{
            maps: loadedData.state.maps,
            modes: loadedData.state.modes,
          }}
          round={round}
        />
      )}
    </ArrayStatePanel>
  )
}

type GameSectionProps = {
  index: number
  options: {
    maps: Array<string>
    modes: Array<string>
  }
  round: ReplicantReturnType<Round>
}

const GameSection = ({ index, options, round }: GameSectionProps) => {
  const game = round.state.value[index]
  return (
    <Section>
      <Box
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <Box mb={3} display="flex">
          <Dropdown
            options={options.maps}
            name="Map"
            value={game.map || ""}
            onChange={(e: any, newVal: string) => {
              round.updateState({
                type: "update",
                payload: { index, value: { map: newVal } },
              })
            }}
            fullWidth
          />
          <Box mr={1.5} />
          <Dropdown
            options={options.modes}
            name="Mode"
            value={game.mode || ""}
            onChange={(e: any, newVal: string) => {
              round.updateState({
                type: "update",
                payload: { index, value: { mode: newVal } },
              })
            }}
            fullWidth
          />
        </Box>
        <Box
          className={css`
            display: flex;
            align-items: baseline;
            justify-content: space-between;
          `}
        >
          <Box mr={1.5}>
            <InputLabel>Winner</InputLabel>
          </Box>
          <WinnerButtonGroup index={index} />
        </Box>
      </Box>
    </Section>
  )
}

type WinnerButtonGroupProps = {
  index: number
}

const WinnerButtonGroup = ({ index }: WinnerButtonGroupProps) => {
  const mapWinners = useMapWinners()
  const teams = useTeams()

  return (
    <ButtonGroup color="primary" variant="contained">
      {[undefined, "A", "B"].map((letter, i) => (
        <Button
          key={letter || "None"}
          disabled={
            mapWinners.replicant?.[index] === teams.replicant?.[i - 1]?.name
          }
          disableTouchRipple={true}
        >
          {letter || "None"}
        </Button>
      ))}
    </ButtonGroup>
  )
}

render(Panel)
