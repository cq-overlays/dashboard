import { useEffect, useState } from "react"
import { ReplicantOptions } from "nodecg/types/server"

export default <T, U>(
  name: string,
  namespace?: string,
  opts?: ReplicantOptions<T>
): [T | U, (input: T) => void] => {
  const [value, updateValue] = useState<T | U>()
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
