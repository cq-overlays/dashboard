import schema from "../../schemas/currentTeams.json"
import { useReplicant } from "./useReplicant"

export type Teams = Array<{
  name: string
  roster: Array<string>
}>

export default () =>
  useReplicant("currentTeams", schema.default, (state: Teams, action) => {
    switch (action.type) {
      case "A":
        return [action.payload, state[1]]
      case "B":
        return [state[0], action.payload]
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useTeams.`
        )
    }
  })
