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

export type Colorlist = Array<ColorPair>

export type LoadedData = {
  maplist: Maplist
  teamlist: Teamlist
  colorlist: Colorlist
}

export type ColorPair = Array<{
  name: string
  value: string
}>

const useLoadedDataReplicant = (): [LoadedData, (input: any) => void] => {
  const [loadedDataReplicant]: [LoadedData, unknown] = useReplicant({
    name: "loadedData",
    opts: {
      defaultValue: {
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
        colorlist: [
          [
            { name: "Slimy Green", value: "#25B100" },
            { name: "Grape", value: "#571DB1" },
          ],
          [
            { name: "Winter Green", value: "#03B362" },
            { name: "Dark Magenta", value: "#B1008D" },
          ],
          [
            { name: "Turquoise", value: "#0CAE6E" },
            { name: "Pumpkin", value: "#F75900" },
          ],
          [
            { name: "Mustard", value: "#CE8003" },
            { name: "Purple", value: "#9208B2" },
          ],
          [
            { name: "Blue", value: "#2922B5" },
            { name: "Green", value: "#5EB604" },
          ],
          [
            { name: "Rich Purple", value: "#7B0393" },
            { name: "Green Apple", value: "#43BA05" },
          ],
          [
            { name: "Yellow", value: "#D9C100" },
            { name: "True Blue", value: "#007AC9" },
          ],
        ],
      },
    },
  })

  const uploadData = async (data: {
    maplist?: Maplist
    teamlist?: Teamlist
    colorlist?: Colorlist
  }) => {
    return await nodecg.sendMessage("uploadData", data)
  }

  return [loadedDataReplicant, uploadData]
}

export default useLoadedDataReplicant
