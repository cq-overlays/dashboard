import { useReplicant } from "./useReplicant"
import schema from "../../schemas/loadedData.json"

export type LoadedData = {
  maplist: Array<{
    name: string
    games: Array<{
      map: string
      mode: string
    }>
  }>
  teamlist: {
    [key: string]: Array<string>
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
    if (action.payload.maplist) {
      state.maplist = action.payload.maplist
    }
    if (action.payload.teamlist) {
      state.teamlist = action.payload.teamlist
    }
    if (action.payload.colors) {
      state.colors = action.payload.colors
    }
    if (action.payload.maps) {
      state.maps = action.payload.maps
    }
    if (action.payload.modes) {
      state.modes = action.payload.modes
    }
    return state
  })
