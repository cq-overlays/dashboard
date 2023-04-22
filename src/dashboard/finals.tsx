import { css } from "@emotion/css"
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material"
import Dropdown from "../components/Dropdown"
import Section from "../components/Section"
import useLoadedData from "../hooks/useLoadedData"
import { ReplicantReturnType } from "../hooks/useReplicant"
import render from "../render"
import useFablFinals, { FinalsGame } from "../hooks/useFablFinals"

const Panel = () => {
  const fablFinals = useFablFinals()
  const loadedData = useLoadedData()

  return (
    <Box
      className={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 1400px;
        gap: 1rem 0;
      `}
    >
      {fablFinals.state?.map((game, i) => (
        <GameSection
          key={i}
          index={i}
          fablFinals={fablFinals}
          game={game}
          options={{
            maps: loadedData.state.maps,
            modes: loadedData.state.modes,
          }}
        />
      ))}
    </Box>
  )
}

type GameSectionProps = {
  index: number
  fablFinals: ReplicantReturnType<FinalsGame[]>
  game: FinalsGame
  options: {
    maps: Array<string>
    modes: Array<string>
  }
}

const GameSection = ({
  index,
  fablFinals,
  game,
  options,
}: GameSectionProps) => {
  return (
    <Section
      className={css`
        max-width: 312px;
      `}
    >
      <Box
        className={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <Box mb={3} display="flex">
          <Dropdown
            options={options.maps}
            name="Map"
            value={game.map || ""}
            onChange={(e: any, newVal: string) => {
              fablFinals.replicateState({
                type: "update",
                payload: { index, value: { map: newVal } },
              })
            }}
            fullWidth
          />
          <Box mr={1.5} />
          <Dropdown
            options={options.modes}
            name="Mode"
            value={game.mode || ""}
            onChange={(e: any, newVal: string) => {
              fablFinals.replicateState({
                type: "update",
                payload: { index, value: { mode: newVal } },
              })
            }}
            fullWidth
          />
        </Box>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">State</FormLabel>
          <RadioGroup
            row={true}
            value={game.state}
            defaultValue="avaliable"
            onChange={e => {
              fablFinals.replicateState({
                type: "update",
                payload: { index, value: { state: e.target.value } },
              })
            }}
          >
            {["avaliable", "banned", "next", "winnerA", "winnerB"].map(v => (
              <FormControlLabel value={v} label={v} control={<Radio />} />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Section>
  )
}

render(Panel)
