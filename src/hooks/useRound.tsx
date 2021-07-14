import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentRound.json"

export type Round = {
  name: string
  value: Array<{
    map: string
    mode: string
  }>
}

export default () =>
  useReplicant("currentRound", schema.default, (state: Round, action) => {
    switch (action.type) {
      case "load":
        state.value = action.payload
        return state
      case "name":
        state.name = action.payload
        return state
      case "update":
        state.value[action.payload.index] = {
          ...state.value[action.payload.index],
          ...action.payload.value,
        }
        return state
      case "add":
        state.value = [
          ...state.value,
          action.payload || {
            map: "",
            mode: "",
          },
        ]
        return state
      case "remove":
        state.value = state.value.slice(0, -1)
        return state
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useMaps.`
        )
    }
  })
