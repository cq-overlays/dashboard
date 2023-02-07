import schema from "../../schemas/currentScores.json"
import { useReplicant } from "./useReplicant"

export type Scores = Array<number>

export default () =>
  useReplicant("currentScores", schema.default, (state: Scores, action) => {
    switch (action.type) {
      case "A":
        return [action.payload, state[1]]
      case "B":
        return [state[0], action.payload]
      case "reset":
        return [0, 0]
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useScores.`
        )
    }
  })
