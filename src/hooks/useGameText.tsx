import { useReplicant } from "./useReplicant"

export type GameText = string

export default () =>
  useReplicant("currentGameText", (state: GameText, action) => action.payload)
