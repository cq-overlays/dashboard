import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentFlavorText.json"

export type FlavorText = string

export default () =>
  useReplicant(
    "currentFlavorText",
    schema.default,
    (state: FlavorText, action) => action.payload
  )
