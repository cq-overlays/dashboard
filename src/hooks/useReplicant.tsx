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
      console.debug(`Update replicant value for '${name}'`, newValue)
      setValue(newValue)
    }
    replicant.on("change", update)
    return () => {
      replicant.removeListener("change", update)
    }
  }, [replicant])

  /* return a local function that's handling the onchange?
  const fakeTest = React.useCallback(() => {
    const update = (newValue: T): void => {
      console.debug(`Update replicant value for '${name}'`, newValue)
      setValue(newValue)
    }
    replicant.on("change", update)
  }) */

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
      console.debug(`Reset state for '${name}'`)
      dispatch({ type: "initState" })
    } else {
      setSkipReset(false)
    }
  }, [replicant])

  const updateState = (payload: any) => {
    console.debug(`Set state for '${name}'`)
    dispatch({ type: "updateState", payload })
    if (replicate === undefined) {
      console.debug(`Auto-replicate state for '${name}'`)
      setReplicant(update(state, payload))
    }
  }
  const replicateState = (action: any) => {
    if (replicate === undefined) {
      throw new Error("Unable to replicateState, replicate is not defined.")
    }
    console.debug(`Replicate state for '${name}'`)
    setSkipReset(true)
    setReplicant(replicate(state, replicant, action))
  }

  console.debug(`Rerender for '${name}'`, state, replicant)
  return [state, updateState, replicateState, replicant]
}
