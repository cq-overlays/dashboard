import schema from "../../schemas/currentFlavorText.json"
import { useReplicant } from "./useReplicant"

export type FlavorText = string

export default () =>
  useReplicant(
    "currentFlavorText",
    schema.default,
    (state: FlavorText, action) => action.payload
  )
