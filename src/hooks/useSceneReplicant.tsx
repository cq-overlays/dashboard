import { usePanel } from "./useReplicant"

type Scene =
  | "Empty Scene"
  | "Scores Scene"
  | "Maplist Scene"
  | "Rosters Scene"
  | "BRB Scene"

export default () =>
  usePanel("currentScene", (scene: Scene) => scene || "Empty Scene")
