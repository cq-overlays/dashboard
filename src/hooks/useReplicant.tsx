/**
 * A base react hook for creating other custom replicant hooks.
 */
import { useEffect, useState } from "react"
import { ReplicantOptions } from "nodecg/types/server"

type ReplicantParameters<T> = {
  name: string
  namespace?: string
  opts?: ReplicantOptions<T>
  initialState?: undefined
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
    const handler = (newValue: T): void => {
      updateValue(newValue)
    }
    replicant.on("change", handler)
    return () => {
      replicant.removeListener("change", handler)
    }
  }, [replicant])

  return [
    value,
    input => {
      replicant.value = input
    },
  ]
}
