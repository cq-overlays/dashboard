import { usePanel } from "./useReplicant"

type Scene = "Scores Scene" | "Maplist Scene" | "Rosters Scene" | "Break Scene"

export default () =>
  usePanel("currentScene", (replicant: Scene) => replicant || "Break Scene")
