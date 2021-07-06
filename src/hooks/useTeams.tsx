import { useReplicant } from "./useReplicant"

export type Teams = Array<string>

export default () =>
  useReplicant("currentTeams", (state: Teams, action) => {
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
