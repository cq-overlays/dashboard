import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentCommentators.json"

export type Commentators = Array<{
  name: string | null
  twitter: string | null
  pronouns: string | null
}>

export default () =>
  useReplicant(
    "currentCommentators",
    schema.default,
    (state: Commentators, action) => {
      switch (action.type) {
        case "set":
          return action.payload
        case "update":
          state[action.payload.index] = {
            ...state[action.payload.index],
            ...action.payload.value,
          }
          return state
        case "remove":
          return state.slice(0, -1)
        case "add":
          return [
            ...state,
            action.payload || {
              name: "",
              twitter: "",
              pronouns: "",
            },
          ]
        default:
          throw new Error(
            `Unsupported action type '${action?.type}' for useCommentators.`
          )
      }
    }
  )
