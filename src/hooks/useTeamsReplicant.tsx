import { Dispatch, useReducer, useEffect } from "react"
import useReplicant from "./useReplicant"

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

export type ActionTypes = {
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

const createState = (teamsReplicant: TeamsReplicant): TeamsState => ({
  nameA: teamsReplicant?.[0]?.name || "Team A",
  nameB: teamsReplicant?.[1]?.name || "Team B",
  scoreA: teamsReplicant?.[0]?.score || 0,
  scoreB: teamsReplicant?.[1]?.score || 0,
  colors: [
    teamsReplicant?.[0]?.color || "#E36D60",
    teamsReplicant?.[1]?.color || "#2FB89A",
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
  const [teamsState, dispatch]: [
    TeamsState,
    Dispatch<ActionTypes>
  ] = useReducer(
    (state: TeamsState, action: ActionTypes) => {
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

  useEffect(() => {
    console.log("State Reset!")
    dispatch({ type: "reset" })
  }, [teamsReplicant])
  const replicate = (overrides: Array<Object>) =>
    setTeamsReplicant([
      { ...teamsReplicant[0], ...overrides[0] },
      { ...teamsReplicant[1], ...overrides[1] },
    ])

  return {
    teams: teamsState,
    replicant: teamsReplicant,
    dispatch,
    replicate,
  }
}

export default useTeamsReplicant
