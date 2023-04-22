import { useReplicant } from "./useReplicant"

export type FinalsGame = {
  map: string
  mode: string
  state: string
}

export default () =>
  useReplicant(
    "fablFinals",
    Array.from({ length: 16 }, (v, i) => i).map(i => ({
      map: "",
      mode: "",
      state: "avaliable",
    })),
    (state: Array<FinalsGame>, action) => {
      switch (action.type) {
        case "update":
          state[action.payload.index] = {
            ...state[action.payload.index],
            ...action.payload.value,
          }
          return state
        default:
          throw new Error(
            `Unsupported action type '${action?.type}' for useFablFinals.`
          )
      }
    }
  )
