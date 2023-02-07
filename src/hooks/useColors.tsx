import schema from "../../schemas/currentColors.json"
import { useReplicant } from "./useReplicant"

export type Colors = Array<string>

export default () =>
  useReplicant("currentColors", schema.default, (state: Colors, action) => {
    switch (action.type) {
      case "set":
        return action.payload
      case "swap":
        return state.reverse()
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useColors.`
        )
    }
  })
