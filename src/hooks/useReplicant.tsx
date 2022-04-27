/**
 * A base react hook, to be implemented in other custom replicant hooks.
 */
import { useEffect, useReducer, useState } from "react"
import { ReplicantOptions } from "nodecg/types/server"

export type ReplicantParameters<T> = {
  name: string
  namespace?: string | any
  opts?: ReplicantOptions<T>
  defaultValue?: T
}

const useRawReplicant = <T, U>({
  name,
  namespace,
  opts,
  defaultValue,
}: ReplicantParameters<T>): [T | U, (input: T) => void] => {
  const [value, setValue] = useState<T | U>()
  const replicant = nodecg.Replicant(name, namespace, opts)

  // Set state on replicant change
  useEffect(() => {
    const update = (newValue: T): void => {
      console.debug(`Update replicant value for '${name}'`, newValue)
      setValue(newValue)
    }
    replicant.on("change", update)
    return () => {
      replicant.removeListener("change", update)
    }
  }, [replicant])

  return [
    value as T | U,
    input => {
      replicant.value = input
    },
  ]
}

export type ActionType = {
  type?: string
  payload?: any
}

export type ReplicantReturnType<Replicant> = {
  replicant: Replicant | undefined
  state: Replicant
  updateState: (action: ActionType) => void
  replicateState: (action?: ActionType) => void
}

export const useReplicant = <Replicant,>(
  name: string,
  defaultValue: Replicant,
  update: (state: Replicant, action: ActionType) => Replicant
): ReplicantReturnType<Replicant> => {
  const init = (replicant: Replicant): Replicant =>
    replicant ? replicant : defaultValue
  const [replicant, setReplicant]: [Replicant, (input: Replicant) => void] =
    useRawReplicant({ name, defaultValue })
  const [state, dispatch] = useReducer(
    (
      state: Replicant,
      action: {
        type: "initState" | "updateState"
        payload?: any
      }
    ) => {
      switch (action.type) {
        case "initState":
          return init(clone(replicant))
        case "updateState":
          return update(clone(state), action.payload)
      }
    },
    replicant,
    init
  )

  const [skipReset, setSkipReset] = useState(false)
  useEffect(() => {
    if (!skipReset) {
      console.debug(`Reset state for '${name}'`)
      dispatch({ type: "initState" })
    } else {
      setSkipReset(false)
    }
  }, [replicant])

  const updateState = (action: ActionType) => {
    console.debug(`Set state for '${name}'`)
    dispatch({ type: "updateState", payload: action })
  }
  const replicateState = (action?: ActionType) => {
    console.debug(`Replicate state for '${name}'`)
    setSkipReset(true)
    let newState
    if (action) {
      newState = update(clone(state), action)
      updateState(action)
    } else {
      newState = clone(state)
    }
    setReplicant(newState)
  }

  console.debug(`Rerender for '${name}'`, state, replicant)
  return { replicant, state, updateState, replicateState }
}

const clone = (obj: any) => {
  if (typeof obj !== "undefined") {
    return JSON.parse(JSON.stringify(obj))
  } else {
    return obj
  }
}
