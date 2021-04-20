import useReplicant from "./useReplicant"

export type Maplist = Array<
  Array<{
    map: string
    mode: string
  }>
>

export type Teamlist = {
  [key: string]: Array<string>
}

export type LoadedData = {
  maplist: Maplist
  teamlist: Teamlist
}

const useLoadedDataReplicant = (): [LoadedData, (input: any) => void] => {
  const [loadedDataReplicant, setLoadedDataReplicant]: [
    LoadedData,
    (input: any) => void
  ] = useReplicant({
    name: "loadedData",
  })

  if (loadedDataReplicant === undefined) {
    setLoadedDataReplicant({
      maplist: [
        [
          { map: "Urchin Underpass", mode: "Rocket" },
          { map: "Urchin Underpass", mode: "Rocket" },
          { map: "Urchin Underpass", mode: "Rocket" },
        ],
      ],
      teamlist: {
        "Team A": ["Atmosphere", "Airport", "Assumption", "Application"],
        "Team B": ["Balloon", "Brick", "Breakfast", "Bathtub"],
      },
    })
  }

  const uploadData = async (data: {
    maplist?: Maplist
    teamlist?: Teamlist
  }) => {
    return await nodecg.sendMessage("uploadData", data)
  }

  return [loadedDataReplicant, uploadData]
}

export default useLoadedDataReplicant
