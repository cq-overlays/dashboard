import { useReplicant } from "./useReplicant"

export type GameScreen = {
  showScores: boolean
  showCommentators: boolean
}

export default () =>
  useReplicant("currentGameScreen", (state: GameScreen, action) => {
    switch (action.type) {
      case "showScores":
        return { ...state, showScores: action.payload }
      case "showCommentators":
        return { ...state, showCommentators: action.payload }
      default:
        throw new Error(
          `Unsupported action type '${action?.type}' for useGameScreen.`
        )
    }
  })
