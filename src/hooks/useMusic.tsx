import { useReplicant } from "./useReplicant"

export type Music = {
  artist: string
  song: string
}

export default () =>
  useReplicant("currentMusic", (state: Music, action) => {
    switch (action.type) {
      case "setArtist":
        return { ...state, artist: action.payload }
      case "setSong":
        return { ...state, song: action.payload }
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useMusic.`
        )
    }
  })
