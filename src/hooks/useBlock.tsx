import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentBlock.json"

export type Block = {
  name: string
  value: Array<{
    name: string | null
    twitter: string | null
    pronouns: string | null
  }>
}

export default () =>
  useReplicant("currentBlock", schema.default, (state: Block, action) => {
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
          `Unsupported action type '${action?.type}' for useBlock.`
        )
    }
  })
