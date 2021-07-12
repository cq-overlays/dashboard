import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentBreakScreen.json"

export type BreakScreen = "maplist" | "rosters" | "brb"

export default () =>
  useReplicant(
    "currentBreakScreen",
    schema.default as "brb",
    (state: BreakScreen, action) => action.payload
  )
