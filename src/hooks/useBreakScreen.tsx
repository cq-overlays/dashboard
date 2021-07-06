import { useReplicant } from "./useReplicant"

export type BreakScreen = "maplist" | "rosters" | "brb"

export default () =>
  useReplicant(
    "currentBreakScreen",
    (state: BreakScreen, action) => action.payload
  )
