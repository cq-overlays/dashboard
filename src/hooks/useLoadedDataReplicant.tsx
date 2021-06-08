import { usePanel } from "./useReplicant"

export type Game = { map: string; mode: string; winner?: string | null }
export type RoundMaps = {
  name: string
  games: Array<Game>
}
export type Maplist = Array<RoundMaps>
export type Teamlist = { [key: string]: Array<string> }
export type Colorlist = Array<ColorPair>
export type ColorPair = Array<{ name: string; value: string }>

export type LoadedData = {
  maplist: Maplist
  teamlist: Teamlist
  colorlist: Colorlist
}

export type LoadedDataParameters = {
  maplist?: Maplist
  teamlist?: Teamlist
  colorlist?: Colorlist
}

const useLoadedDataReplicant = (): [
  LoadedData,
  (input: LoadedDataParameters) => void
] => {
  const [state, updateState, replicateState, replicant]: any = usePanel(
    "loadedData",
    (loadedDataReplicant: LoadedData): LoadedData => ({
      maplist: [
        ...(loadedDataReplicant?.maplist ? loadedDataReplicant.maplist : []),
      ] || [
        {
          name: "Test Round",
          games: [
            { map: "Moray Towers", mode: "Clam Blitz" },
            { map: "Moray Towers", mode: "Clam Blitz" },
            { map: "Moray Towers", mode: "Clam Blitz" },
          ],
        },
      ],
      teamlist: Object.assign({}, loadedDataReplicant?.teamlist) || {
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
        [
          { name: "Fork", value: "#E36D60" },
          { name: "Spoon", value: "#2FB89A" },
        ],
      ],
    }),
    (state, data) => {
      const newData = { ...replicant }
      if (data.maplist) {
        newData.maplist = data.maplist
      }
      if (data.teamlist) {
        newData.teamlist = data.teamlist
      }
      if (data.colorlist) {
        newData.colorlist = data.colorlist
      }
      return newData
    }
  )

  return [state, updateState]
}

export default useLoadedDataReplicant
