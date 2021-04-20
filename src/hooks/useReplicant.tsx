/**
 * A base react hook, to be implemented in other custom replicant hooks.
 */
import { useEffect, useState } from "react"
import { ReplicantOptions } from "nodecg/types/server"

type ReplicantParameters<T> = {
  name: string
  namespace?: any
  opts?: ReplicantOptions<T>
  initialState?: any
}

export default <T, U>({
  name,
  namespace = undefined,
  opts = undefined,
  initialState = undefined,
}: ReplicantParameters<T>): [T | U, (input: T) => void] => {
  const [value, updateValue] = useState<T | U>(initialState)
  const replicant = nodecg.Replicant(name, namespace, opts)

  useEffect(() => {
    const update = (newValue: T): void => {
      updateValue(newValue)
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
