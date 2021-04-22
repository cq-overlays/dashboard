import { usePanel } from "./useReplicant"

export type TeamsState = {
  nameA: string
  nameB: string
  scoreA: number
  scoreB: number
  colors: Array<string>
}

export type TeamsReplicant = Array<{
  name: string
  score: number
  color: string
}>

export default () =>
  usePanel(
    "currentTeams",
    (teamsReplicant: TeamsReplicant): TeamsState => ({
      nameA: teamsReplicant?.[0]?.name || "Team A",
      nameB: teamsReplicant?.[1]?.name || "Team B",
      scoreA: teamsReplicant?.[0]?.score || 0,
      scoreB: teamsReplicant?.[1]?.score || 0,
      colors: [
        teamsReplicant?.[0]?.color || "#E36D60",
        teamsReplicant?.[1]?.color || "#2FB89A",
      ],
    }),
    (state: TeamsState, action: any) => {
      switch (action.type) {
        case "setNameA":
          return { ...state, nameA: action.payload }
        case "setNameB":
          return { ...state, nameB: action.payload }
        case "setScoreA":
          return { ...state, scoreA: action.payload }
        case "setScoreB":
          return { ...state, scoreB: action.payload }
        case "resetScores":
          return { ...state, scoreA: 0, scoreB: 0 }
        case "setColors":
          return { ...state, colors: action.payload }
        case "swapColors":
          return { ...state, colors: [state.colors[1], state.colors[0]] }
        default:
          throw new Error(
            `Unsupported action type '${action?.type}' for useTeams.`
          )
      }
    },
    (state, replicant, action) => {
      switch (action.type) {
        case "score":
          return [
            { ...replicant?.[0], score: state.scoreA },
            { ...replicant?.[1], score: state.scoreB },
          ]
        case "name":
          return [
            { ...replicant?.[0], name: state.nameA, color: state.colors[0] },
            { ...replicant?.[1], name: state.nameB, color: state.colors[1] },
          ]
        default:
          return replicant
      }
    }
  )
