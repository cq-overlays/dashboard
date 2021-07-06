import { useReplicant } from "./useReplicant"

export type BreakText = string

export default () =>
  useReplicant("currentBreakText", (state: BreakText, action) => action.payload)
