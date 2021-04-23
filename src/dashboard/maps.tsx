import React from "react"
import { css } from "@emotion/css"
import { Button, Box, InputLabel, ButtonGroup } from "@material-ui/core"
import { AddRounded, RemoveRounded } from "@material-ui/icons"

import render from "../render"
import useMapsReplicant from "../hooks/useMapsReplicant"
import useLoadedDataReplicant, {
  RoundMaps,
  Game,
} from "../hooks/useLoadedDataReplicant"
import Section from "../components/Section"
import Dropdown from "../components/Dropdown"

const Panel = () => {
  const [state, updateState, replicateState, replicant] = useMapsReplicant()
  const [loadedData] = useLoadedDataReplicant()

  return (
    <Box>
      <Section>
        <RoundInput
          state={state}
          updateState={updateState}
          loadedData={loadedData}
        />
      </Section>
      <GameSections state={state} updateState={updateState} />
    </Box>
  )
}

const RoundInput = ({ state, updateState, loadedData }) => {
  const [roundInput, setRoundInput] = React.useState(
    loadedData.maplist.find(
      round => JSON.stringify(round.games) === JSON.stringify(state)
    )?.name || null
  )

  const loadRoundMaps = () => {
    updateState({
      type: "setGames",
      payload: loadedData.maplist.find(r => r.name === roundInput).games,
    })
  }
  return (
    <Box
      className={css`
        display: flex;
        align-items: flex-end;
      `}
    >
      <Dropdown
        options={loadedData.maplist.map(r => r.name)}
        name="Round"
        value={roundInput}
        onChange={(e, round) => setRoundInput(round)}
      />
      <Box ml={1.5}>
        <Button
          className={css`
            white-space: nowrap;
          `}
          color="primary"
          variant="contained"
          disabled={!loadedData.maplist.find(r => r.name === roundInput)}
          onClick={loadRoundMaps}
        >
          Load Round
        </Button>
      </Box>
    </Box>
  )
}

const GameSections = ({ state, updateState }) => {
  const modes = ["Splat Zones", "Tower Control", "Rainmaker", "Clam Blitz"]
  const maps = [
    "Goby Arena",
    "MakoMart",
    "New Albacore Hotel",
    "Kelp Dome",
    "Moray Towers",
    "Skipper Pavilion",
    "Arowana Mall",
    "Blackbelly Skatepark",
    "Musselforge Fitness",
    "Humpback Pump Track",
    "Snapper Canal",
  ]
  return (
    <>
      {state.map((game: Game) => (
        <Section key={`game-${state.indexOf(game)}`}>
          <Box
            className={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <Box mb={3} display="flex">
              <Dropdown
                options={maps}
                name="Map"
                value={game.map}
                onChange={(e, newMap: string) => {
                  updateState({
                    type: "setGameMap",
                    index: state.indexOf(game),
                    payload: newMap,
                  })
                }}
                fullWidth
              />
              <Box mr={1.5} />
              <Dropdown
                options={modes}
                name="Mode"
                value={game.mode}
                onChange={(e, newMode: string) => {
                  updateState({
                    type: "setGameMode",
                    index: state.indexOf(game),
                    payload: newMode,
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
              <InputLabel>Winner</InputLabel>
              <ButtonGroup color="primary" variant="contained">
                {[null, "A", "B"].map(letter => (
                  <Button
                    key={`game-${state.indexOf(game)}-${letter}`}
                    disabled={letter === game.winner}
                    onClick={e =>
                      updateState({
                        type: "setGameWinner",
                        index: state.indexOf(game),
                        payload: letter,
                      })
                    }
                  >
                    {letter || "None"}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </Box>
        </Section>
      ))}
      <Box
        className={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <ButtonGroup variant="text">
          <Button
            color="primary"
            onClick={() => updateState({ type: "addGame" })}
          >
            <AddRounded />
          </Button>
          <Button
            color="secondary"
            onClick={() => updateState({ type: "removeGame" })}
          >
            <RemoveRounded />
          </Button>
        </ButtonGroup>
      </Box>
    </>
  )
}

render(Panel)
