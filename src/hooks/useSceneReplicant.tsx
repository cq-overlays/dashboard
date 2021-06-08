import { usePanel } from "./useReplicant"

type Scene = "Scores Scene" | "Maplist Scene" | "Rosters Scene" | "BRB Scene"

export default () =>
  usePanel("currentScene", (replicant: Scene) => replicant || "BRB Scene")
