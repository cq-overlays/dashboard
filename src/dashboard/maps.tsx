import React, { useEffect } from "react"
import { css } from "@emotion/css"
import {
  Button,
  Box,
  InputLabel,
  ButtonGroup,
  IconButton,
} from "@material-ui/core"
import render, { AddRounded, RemoveRounded } from "../render"
import useMapsReplicant, { Games } from "../hooks/useMapsReplicant"
import useLoadedDataReplicant, {
  LoadedData,
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
          replicant={replicant}
          updateState={updateState}
          replicateState={replicateState}
          loadedData={loadedData}
        />
      </Section>
      <GameSections updateState={updateState} replicateState={replicateState}>
        {state.map(game => (
          <Section key={`game-${state.indexOf(game)}`}>
            <GameSection
              game={game}
              state={state}
              updateState={updateState}
              replicateState={replicateState}
            />
          </Section>
        ))}
      </GameSections>
    </Box>
  )
}

type MapsParams = {
  state: Games
  updateState: Function
  replicateState: Function
  loadedData?: LoadedData
  children: any
}

const RoundInput = ({
  state,
  replicant,
  updateState,
  replicateState,
  loadedData,
}: MapsParams) => {
  const [roundInput, setRoundInput] = React.useState()

  const isDisabled = () => {
    let isDisabled = true
    let oldState: Games
    if (roundInput) {
      oldState = loadedData?.maplist.find(r => r.name === roundInput)?.games
    } else {
      oldState = replicant
    }
    state.forEach((game, i) => {
      const oldGame = oldState?.[i]
      if (oldGame?.map !== game.map || oldGame?.mode !== game.mode) {
        isDisabled = false
      }
    })
    return isDisabled
  }

  const loadRoundMaps = () => {
    if (roundInput) {
      updateState({
        type: "setGames",
        payload: loadedData?.maplist.find(r => r.name === roundInput)?.games,
      })
      replicateState({
        payload: loadedData?.maplist.find(r => r.name === roundInput)?.games,
      })
      setRoundInput("")
    } else {
      replicateState()
    }
  }

  return (
    <Box
      className={css`
        display: flex;
        align-items: flex-end;
      `}
    >
      <Dropdown
        options={loadedData?.maplist.map(r => r.name)}
        name="Load Round"
        value={roundInput || ""}
        onChange={(e: any, round: string) => setRoundInput(round)}
      />
      <Box ml={1.5}>
        <Button
          className={css`
            white-space: nowrap;
          `}
          color="primary"
          variant="contained"
          disabled={isDisabled()}
          onClick={loadRoundMaps}
        >
          {isDisabled() ? "Updated" : "Update"}
        </Button>
      </Box>
    </Box>
  )
}

const GameSections = ({ children, updateState }: MapsParams) => (
  <>
    {children}
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

const GameSection = ({
  game,
  state,
  updateState,
  replicateState,
}: GameSectionParams) => {
  // useEffect(() => {
  //   replicateState()
  // }, [state[state.indexOf(game)].winner])
  return (
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
          value={game.map || ""}
          onChange={(e: any, newMap: string) => {
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
          value={game.mode || ""}
          onChange={(e: any, newMode: string) => {
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
        <Box mr={1.5}>
          <InputLabel>Winner</InputLabel>
        </Box>
        <ButtonGroup color="primary" variant="contained">
          {[null, "A", "B"].map(letter => (
            <Button
              key={`game-${state.indexOf(game)}-${letter}`}
              disabled={letter === game.winner}
              onClick={(e: any) =>
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
  )
}

type GameSectionParams = {
  game: Game
  state: Games
  updateState: Function
  replicateState: Function
}

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

render(Panel)
