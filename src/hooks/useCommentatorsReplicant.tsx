import { usePanel } from "./useReplicant"

export type Commentator = {
  name: string | null
  twitter: string | null
  pronouns: string | null
}

export default () =>
  usePanel(
    "currentCommentators",
    (replicant: Array<Commentator>) =>
      replicant?.map(comm => Object.assign({}, comm)) || [
        { name: null, twitter: null, pronouns: null },
        { name: null, twitter: null, pronouns: null },
      ],
    (state: Array<Commentator>, action: any) => {
      switch (action.type) {
        case "setName":
          const newNameState = [...state]
          newNameState[action.index].name = action.payload
          return newNameState
        case "setTwitter":
          const newTwitterState = [...state]
          newTwitterState[action.index].twitter = action.payload
          return newTwitterState
        case "setPronouns":
          const newPronounsState = [...state]
          newPronounsState[action.index].pronouns = action.payload
          return newPronounsState
        case "removeCommentator":
          return state.slice(0, -1)
        case "addCommentator":
          return [
            ...state,
            action?.payload || {
              name: null,
              twitter: null,
              pronouns: null,
            },
          ]
        default:
          throw new Error(
            `Unsupported action type '${action?.type}' for useCommentators.`
          )
      }
    },
    (state, replicant, action) => {
      const newReplicant = replicant.map(comm => Object.assign({}, comm))
      newReplicant[action.index] = state[action.index]
      return newReplicant
    }
  )
