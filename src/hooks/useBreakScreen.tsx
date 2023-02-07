import schema from "../../schemas/currentBreakScreen.json"
import { useReplicant } from "./useReplicant"

export type BreakScreen = "maplist" | "rosters" | "brb"

export default () =>
  useReplicant(
    "currentBreakScreen",
    schema.default as "brb",
    (state: BreakScreen, action) => action.payload
  )
