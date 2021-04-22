import { usePanel } from "./useReplicant"

export type Maplist = Array<Array<{ map: string; mode: string }>>
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
      maplist: loadedDataReplicant?.maplist || [
        [
          { map: "Urchin Underpass", mode: "Rocket" },
          { map: "Urchin Underpass", mode: "Rocket" },
          { map: "Urchin Underpass", mode: "Rocket" },
        ],
      ],
      teamlist: loadedDataReplicant?.teamlist || {
        "Team A": ["Atmosphere", "Airport", "Assumption", "Application"],
        "Team B": ["Balloon", "Brick", "Breakfast", "Bathtub"],
      },
      colorlist: loadedDataReplicant?.colorlist || [
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
    }),
    (state, data) => ({
      ...replicant,
      maplist: data.maplist,
      teamlist: data.teamlist,
      colorlist: data.colorlist,
    })
  )

  return [state, updateState]
}

export default useLoadedDataReplicant
