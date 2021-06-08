import { usePanel } from "./useReplicant"

type FlavorText = string

export default () =>
  usePanel(
    "currentFlavorText",
    (replicant: FlavorText) => "" + replicant || null,
    (_, state) => "" + state,
    state => "" + state
  )
