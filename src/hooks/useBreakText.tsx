import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentBreakText.json"

export type BreakText = string

export default () =>
  useReplicant(
    "currentBreakText",
    schema.default,
    (state: BreakText, action) => action.payload
  )
