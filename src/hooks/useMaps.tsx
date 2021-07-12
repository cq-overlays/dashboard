import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentMaps.json"

export type Game = {
  map: string
  mode: string
}

export default () =>
  useReplicant("currentMaps", schema.default, (state: Array<Game>, action) => {
    switch (action.type) {
      case "setGames":
        return action.payload
      case "updateGame":
        state[action.payload.index] = {
          ...state[action.payload.index],
          ...action.payload.value,
        }
        return state
      case "removeGame":
        return state.slice(0, -1)
      case "addGame":
        return [...state, action.payload]
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useMaps.`
        )
    }
  })
