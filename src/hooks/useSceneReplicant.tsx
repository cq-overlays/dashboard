import useReplicant from "./useReplicant"

type Scene =
  | "Empty Scene"
  | "Scores Scene"
  | "Maplist Scene"
  | "Rosters Scene"
  | "BRB Scene"

const useSceneReplicant = (): [Scene, (input: any) => void] => {
  const [sceneReplicant, setSceneReplicant]: [
    Scene,
    (input: any) => void
  ] = useReplicant({
    name: "currentScene",
  })

  if (sceneReplicant === undefined) {
    setSceneReplicant("Empty Scene")
  }

  return [sceneReplicant, setSceneReplicant]
}

export default useSceneReplicant
