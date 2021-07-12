import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentMapWinners.json"

export type MapWinners = Array<number>

export default () =>
  useReplicant(
    "currentMapWinners",
    schema.default,
    (state: MapWinners, action) => action.payload
  )
