import { useReplicant } from "./useReplicant"
import schema from "../../schemas/loadedData.json"

export type LoadedData = {
  rounds: {
    [key: string]: Array<{
      map: string
      mode: string
    }>
  }
  teams: {
    [key: string]: Array<string>
  }
  blocks: {
    [key: string]: Array<{
      name: string
      twitter: string
      pronouns: string
    }>
  }
  colors: Array<
    Array<{
      name: string
      value: string
    }>
  >
  maps: Array<string>
  modes: Array<string>
}

export const defaultData = schema.default

export default () =>
  useReplicant("loadedData", schema.default, (state: LoadedData, action) => {
    switch (action.type) {
      case "upload":
        Object.keys(state).forEach(key => {
          if (action.payload[key]) {
            state[key] = action.payload[key]
          }
          return state
        })
      case "resetKey":
        state[action.payload] = schema.default[action.payload]
        return state
      case "resetAll":
        return schema.default
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useLoadedData.`
        )
    }
  })
