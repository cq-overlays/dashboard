import { usePanel } from "./useReplicant"

export type Maps = Array<{
  map: string
  mode: string
  winner: string | null
}>

export default () =>
  usePanel(
    "currentMaps",
    (replicant: Maps): Maps =>
      replicant || [
        { map: null, mode: null, winner: null },
        { map: null, mode: null, winner: null },
        { map: null, mode: null, winner: null },
      ],
    (state: Maps, action: any) => {
      switch (action.type) {
        case "setGames":
          return action.payload
        case "setGameMap":
          const gameMapState = [...state]
          gameMapState[action.index].map = action.payload
          return gameMapState
        case "setGameMode":
          const gameModeState = [...state]
          gameModeState[action.index].mode = action.payload
          return gameModeState
        case "setGameWinner":
          const gameWinnerState = [...state]
          gameWinnerState[action.index].winner = action.payload
          return gameWinnerState
        case "addGame":
          return [
            ...state,
            action?.payload || {
              map: null,
              mode: null,
              winner: null,
            },
          ]
        case "removeGame":
          return state.slice(0, -1)
        default:
          throw new Error(
            `Unsupported action type '${action?.type}' for useMaps.`
          )
      }
    },
    (state, replicant) => state
  )
