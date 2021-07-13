import React from "react"
import { css } from "@emotion/css"
import { Button, Box, ButtonGroup } from "@material-ui/core"

import { RemoveRounded, AddRounded } from "../render"
import Section from "../components/Section"
import Dropdown from "../components/Dropdown"
import { ReplicantReturnType } from "../hooks/useReplicant"

type ArrayStatePanelProps = {
  hook: ReplicantReturnType<Array<any>>
  name: string
  options: Array<any>
  getOptionValue: (option: any) => any
  onLoad?: (option: any) => void
  children: (index: number) => React.ReactFragment
}

export default ({
  hook,
  name,
  options,
  getOptionValue,
  onLoad,
  children,
}: ArrayStatePanelProps) => {
  const [selectedOption, setSelectedOption] = React.useState("")
  const isUpdated = () => {
    if (hook.replicant) {
      if (JSON.stringify(hook.state) === JSON.stringify(hook.replicant)) {
        if (!selectedOption) {
          return true
        } else {
          if (
            JSON.stringify(hook.state) ===
            JSON.stringify(getOptionValue(selectedOption))
          ) {
            return true
          }
        }
      }
    }
  }
  const handleUpdate = () => {
    if (selectedOption) {
      hook.replicateState({
        type: "set",
        payload: getOptionValue(selectedOption),
      })
      if (onLoad) {
        onLoad(selectedOption)
      }
      setSelectedOption("")
    } else {
      hook.replicateState()
    }
  }
  return (
    <Box
      className={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <Section>
        <Box
          className={css`
            display: flex;
            align-items: flex-end;
          `}
        >
          <Dropdown
            options={options}
            name={`Load ${name}`}
            value={selectedOption}
            onChange={(e: any, option: string) => setSelectedOption(option)}
          />
          <Box ml={1.5}>
            <Button
              color="primary"
              variant="contained"
              disabled={isUpdated()}
              onClick={handleUpdate}
            >
              {isUpdated() ? "Updated" : selectedOption ? "Load" : "Update"}
            </Button>
          </Box>
        </Box>
      </Section>
      {hook.state.map((_, index) => children(index))}
      <Box
        className={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <ButtonGroup variant="text">
          <Button
            color="primary"
            onClick={() => hook.updateState({ type: "add" })}
          >
            <AddRounded />
          </Button>
          <Button
            color="secondary"
            onClick={() => hook.updateState({ type: "remove" })}
          >
            <RemoveRounded />
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  )
}
