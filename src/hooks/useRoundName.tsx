import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentRoundName.json"

export type RoundName = string

export default () =>
  useReplicant(
    "currentRoundName",
    schema.default,
    (state: RoundName, action) => action.payload
  )
