import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentGameText.json"

export type GameText = string

export default () =>
  useReplicant(
    "currentGameText",
    schema.default,
    (state: GameText, action) => action.payload
  )
