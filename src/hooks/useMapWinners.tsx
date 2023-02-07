import schema from "../../schemas/currentMapWinners.json"
import { useReplicant } from "./useReplicant"

export type MapWinners = Array<"A" | "B">

export default () =>
  useReplicant(
    "currentMapWinners",
    schema.default,
    (state: MapWinners, action) => action.payload
  )
