import { Dispatch, useReducer, useEffect } from "react"
import useReplicant from "./useReplicant"

type TeamsState = {
  nameA: string
  nameB: string
  scoreA: number
  scoreB: number
  colors: Array<string>
}

type TeamsReplicant = Array<{
  name: string
  score: number
  color: string
}>

type ActionTypes = {
  type:
    | "setNameA"
    | "setNameB"
    | "setScoreA"
    | "setScoreB"
    | "resetScores"
    | "setColors"
    | "swapColors"
    | "reset"
  payload?: any
}

const createState = (teamsReplicant): TeamsState => ({
  nameA: teamsReplicant?.[0]?.name || "Team A",
  nameB: teamsReplicant?.[1]?.name || "Team B",
  scoreA: teamsReplicant?.[0]?.score || 0,
  scoreB: teamsReplicant?.[1]?.score || 0,
  colors: [
    teamsReplicant?.[0]?.color || "#e36d60",
    teamsReplicant?.[1]?.color || "#2fb89a",
  ],
})

const useTeamsReplicant = (): {
  teams: TeamsState
  replicant: TeamsReplicant
  dispatch: Dispatch<ActionTypes>
  replicate: Function
} => {
  const [teamsReplicant, setTeamsReplicant]: [
    TeamsReplicant,
    any
  ] = useReplicant({
    name: "currentTeams",
  })
  const [teamsState, dispatch]: [TeamsState, any] = useReducer(
    (state, action) => {
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
        case "reset":
          return createState(teamsReplicant)
        default:
          throw new Error(
            `Unsupported action type '${action?.type}' for useTeams dispatch.`
          )
      }
    },
    teamsReplicant,
    createState
  )

  const replicate = overrides => {
    setTeamsReplicant([
      { ...teamsReplicant[0], ...overrides[0] },
      { ...teamsReplicant[1], ...overrides[1] },
    ])
  }

  return {
    teams: teamsState,
    replicant: teamsReplicant,
    dispatch,
    replicate,
  }
}

export default useTeamsReplicant
