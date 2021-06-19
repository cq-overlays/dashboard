import React from "react"
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
  state?: Games
  replicant?: Games
  updateState: Function
  replicateState: Function
  loadedData?: LoadedData
  children?: any
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
    if (oldState?.length !== state?.length) {
      isDisabled = false
    } else {
      state.forEach((game, i) => {
        const oldGame = oldState?.[i]
        if (oldGame?.map !== game.map || oldGame?.mode !== game.mode) {
          isDisabled = false
        }
      })
    }
    return isDisabled
  }

  const loadRoundMaps = () => {
    if (roundInput) {
      updateState({
        type: "setGames",
        payload: loadedData?.maplist.find(r => r.name === roundInput)?.games,
      })
      replicateState({
        type: "all",
        payload: loadedData?.maplist.find(r => r.name === roundInput)?.games,
      })
      setRoundInput("")
    } else {
      replicateState({ type: "all" })
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
          {isDisabled() ? "Updated" : roundInput ? "Load" : "Update"}
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

type GameSectionParams = {
  game: Game
  state: Games
  updateState: Function
  replicateState: Function
}

const GameSection = ({
  game,
  state,
  updateState,
  replicateState,
}: GameSectionParams) => {
  const index = state.indexOf(game)
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
              index,
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
              index,
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
              key={`game-${index}-${letter}`}
              disabled={letter === game.winner}
              onClick={(e: any) => {
                updateState({ type: "setGameWinner", index, payload: letter })
                replicateState({ type: "winner", index, payload: letter })
              }}
            >
              {letter || "None"}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Box>
  )
}

const modes = ["Splat Zones", "Tower Control", "Rainmaker", "Clam Blitz"]
const maps = [
  "Ancho-V Games",
  "Arowana Mall",
  "Blackbelly Skatepark",
  "Camp Triggerfish",
  "Goby Arena",
  "Humpback Pump Track",
  "Inkblot Art Academy",
  "Kelp Dome",
  "MakoMart",
  "Manta Maria",
  "Moray Towers",
  "Musselforge Fitness",
  "New Albacore Hotel",
  "Piranha Pit",
  "Port Mackerel",
  "Shellendorf Institute",
  "Skipper Pavilion",
  "Snapper Canal",
  "Starfish Mainstage",
  "Sturgeon Shipyard",
  "The Reef",
  "Urchin Underpass",
  "Wahoo World",
  "Walleye Warehouse",
]

render(Panel)
