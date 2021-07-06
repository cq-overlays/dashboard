import { useReplicant } from "./useReplicant"

export type LoadedData = {
  maplist: Maplist
  teamlist: Teamlist
  colors: Colors
  maps: Maps
  modes: Modes
}
export type Maplist = Array<{
  name: string
  games: Array<{
    map: string
    mode: string
  }>
}>
export type Teamlist = Array<string>
export type Colors = Array<Array<number>>
export type Maps = Array<string>
export type Modes = Array<string>

export default () =>
  useReplicant("loadedData", (state: LoadedData, action) => {
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
