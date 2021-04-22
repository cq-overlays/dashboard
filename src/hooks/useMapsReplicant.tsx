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
        {
          map: "Urchin Underpass",
          mode: "Rocket",
          winner: null,
        },
        {
          map: "Urchin Underpass",
          mode: "Rocket",
          winner: null,
        },
        {
          map: "Urchin Underpass",
          mode: "Rocket",
          winner: null,
        },
      ],
    (state: Maps, action: any) => {
      switch (action.type) {
        case "setMaps":
          return action.payload
        case "setMapWinner":
          let newState = [...state]
          newState[action.index].winner = action.payload
          return newState
        default:
          throw new Error(
            `Unsupported action type '${action?.type}' for useMaps.`
          )
      }
    },
    (state, replicant) => state
  )
