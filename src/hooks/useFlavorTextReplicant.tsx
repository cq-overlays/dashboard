import { usePanel } from "./useReplicant"

type FlavorText = string

export default () =>
  usePanel("currentFlavorText", (replicant: FlavorText) => replicant || null)
