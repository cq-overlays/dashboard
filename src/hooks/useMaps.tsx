import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentMaps.json"

export type Maps = Array<{
  map: string
  mode: string
}>

export default () =>
  useReplicant("currentMaps", schema.default, (state: Maps, action) => {
    switch (action.type) {
      case "set":
        return action.payload
      case "update":
        state[action.payload.index] = {
          ...state[action.payload.index],
          ...action.payload.value,
        }
        return state
      case "remove":
        return state.slice(0, -1)
      case "add":
        return [
          ...state,
          action.payload || {
            map: "",
            mode: "",
          },
        ]
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useMaps.`
        )
    }
  })
