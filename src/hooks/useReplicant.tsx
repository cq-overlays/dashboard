/**
 * A base react hook, to be implemented in other custom replicant hooks.
 */
import { useEffect, useReducer, useState } from "react"
import { ReplicantOptions } from "nodecg/types/server"

type ReplicantParameters<T> = {
  name: string
  namespace?: string | any
  opts?: ReplicantOptions<T>
}

export const useReplicant = <T, U>({
  name,
  namespace,
  opts,
}: ReplicantParameters<T>): [T | U, (input: T) => void] => {
  const [value, setValue]: any = useState<T | U>()
  const replicant = nodecg.Replicant(name, namespace, opts)

  // Set state on replicant change
  useEffect(() => {
    const update = (newValue: T): void => {
      console.log(`Update replicant value for '${name}'`, newValue)
      setValue(newValue)
    }
    replicant.on("change", update)
    return () => {
      replicant.removeListener("change", update)
    }
  }, [replicant])

  return [
    value,
    input => {
      replicant.value = input
    },
  ]
}

export const usePanel = <Replicant, State>(
  name: string,
  init: (replicant: Replicant) => State,
  update: (state: State, action: any) => State = (_, state) => state,
  replicate?: (state: State, replicant: Replicant, action: any) => Replicant
): [State, (action: any) => void, (action: any) => void, Replicant] => {
  const [replicant, setReplicant]: [Replicant, Function] = useReplicant({
    name,
  })
  const [state, dispatch]: [State, Function] = useReducer(
    (
      state: State,
      action: {
        type: "initState" | "updateState"
        payload: any
      }
    ) => {
      switch (action.type) {
        case "initState":
          return init(replicant)
        case "updateState":
          return update(state, action.payload)
      }
    },
    replicant,
    init
  )

  const [skipReset, setSkipReset] = useState(false)
  useEffect(() => {
    if (!skipReset) {
      setSkipReset(false)
      console.log(`Reset state for '${name}'`)
      dispatch({ type: "initState" })
    }
  }, [replicant])

  const updateState = (action: any) => {
    console.log(`Set state for '${name}'`)
    dispatch({ type: "updateState", payload: action })
    if (replicate === undefined) {
      // console.log(`Auto-replicate state for '${name}'`)
      setReplicant(action)
    }
  }
  const replicateState = (action: any) => {
    if (replicate === undefined) {
      throw new Error("Unable to replicateState, replicate is not defined.")
    }
    console.log(`Replicate state for '${name}'`)
    setSkipReset(true)
    setReplicant(replicate(state, replicant, action))
  }

  console.log(`Rerender for '${name}'`, state, replicant)
  return [state, updateState, replicateState, replicant]
}
