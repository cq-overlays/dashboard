import schema from "../../schemas/lastFmData.json"
import { useReplicant } from "./useReplicant"

export type LastFMData = {
  enabled: boolean
  config: {
    username: string | null
    token: string | null
  }
}

export default () =>
  useReplicant("lastFmData", schema.default, (state: LastFMData, action) => {
    switch (action.type) {
      case "setEnabled":
        state.enabled = action.payload
        return state
      case "setUsername":
        state.config.username = action.payload
        return state
      case "setToken":
        state.config.token = action.payload
        return state
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useLastFmData.`
        )
    }
  })
