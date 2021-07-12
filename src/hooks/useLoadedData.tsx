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

export default () =>
  useReplicant("loadedData", schema.default, (state: LoadedData, action) => {
    Object.keys(state).forEach(key => {
      if (action.payload[key]) {
        state[key] = action.payload[key]
      }
    })
    return state
  })
