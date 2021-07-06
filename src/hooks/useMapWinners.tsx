import { useReplicant } from "./useReplicant"

export type MapWinners = Array<number>

export default () =>
  useReplicant(
    "currentMapWinners",
    (state: MapWinners, action) => action.payload
  )
