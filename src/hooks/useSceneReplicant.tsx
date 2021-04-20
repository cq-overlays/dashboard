import useReplicant from "./useReplicant"

type Scene =
  | "Empty Scene"
  | "Scores Scene"
  | "Maplist Scene"
  | "Rosters Scene"
  | "BRB Scene"

const useSceneReplicant = (): [Scene, (input: any) => void] => {
  const [sceneReplicant, setSceneReplicant]: any = useReplicant({
    name: "currentScene",
    opts: {
      defaultValue: "Empty Scene",
    },
  })

  return [sceneReplicant, setSceneReplicant]
}

export default useSceneReplicant
