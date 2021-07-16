import { useReplicant } from "./useReplicant"
import schema from "../../schemas/currentMusic.json"

export type Music = {
  song: string
  artist: string
}

export default () =>
  useReplicant("currentMusic", schema.default, (state: Music, action) => {
    switch (action.type) {
      case "load":
        return action.payload
      case "setSong":
        return { ...state, song: action.payload }
      case "setArtist":
        return { ...state, artist: action.payload }
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useMusic.`
        )
    }
  })
