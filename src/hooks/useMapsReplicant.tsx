import { usePanel } from "./useReplicant"

export type Game = {
  map: string
  mode: string
  winner?: string | null
}
export type Games = Array<Game>

export default () =>
  usePanel(
    "currentMaps",
    (replicant: Games): Games =>
      replicant?.map(game => Object.assign({}, game)) || [
        { map: "Urchin Underpass", mode: "Rocket", winner: null },
        { map: "Urchin Underpass", mode: "Rocket", winner: null },
        { map: "Urchin Underpass", mode: "Rocket", winner: null },
      ],
    (state: Games, action: any) => {
      switch (action.type) {
        case "setGames":
          const games: Games = []
          action.payload.forEach((game: Game) => {
            games.push(buildGameState(game))
          })
          return games
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
    (state, replicant, action) => {
      switch (action.type) {
        case "all":
          return (
            action?.payload?.map(buildGameState) || [
              ...state.map(buildGameState),
            ]
          )
        case "winner":
          const newReplicant = [...state]
          newReplicant.forEach((map, index) => {
            map.winner = action.payload[index] || null
          })
          return newReplicant
      }
    }
  )

const buildGameState = (game: Game): Game => ({
  map: game.map,
  mode: game.mode,
  winner: typeof game.winner === typeof "" ? game.winner : null,
})
