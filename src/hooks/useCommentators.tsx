import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentCommentators.json"

export type Commentator = {
  name: string | null
  twitter: string | null
  pronouns: string | null
}

export default () =>
  useReplicant(
    "currentCommentators",
    schema.default,
    (state: Array<Commentator>, action) => {
      switch (action.type) {
        case "updateCommentator":
          state[action.payload.index] = {
            ...state[action.payload.index],
            ...action.payload.value,
          }
          return state
        case "removeCommentator":
          return state.slice(0, -1)
        case "addCommentator":
          return [...state, action.payload]
        default:
          throw new Error(
            `Unsupported action type '${action?.type}' for useCommentators.`
          )
      }
    }
  )
