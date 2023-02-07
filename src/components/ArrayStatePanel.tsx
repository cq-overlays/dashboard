import { css } from "@emotion/css"
import { Box, Button, ButtonGroup } from "@mui/material"

import Dropdown from "../components/Dropdown"
import Section from "../components/Section"
import { ReplicantReturnType } from "../hooks/useReplicant"
import { AddRounded, RemoveRounded } from "../render"

type ArrayStatePanelProps = {
  hook: ReplicantReturnType<{ name: string; value: Array<any> }>
  name: string
  options: Array<any>
  getOptionValue: (option: any) => any
  children: (index: number) => JSX.Element
}

export default ({
  hook,
  name,
  options,
  getOptionValue,
  children,
}: ArrayStatePanelProps) => {
  const isUpdated = () =>
    JSON.stringify(hook.state) === JSON.stringify(hook.replicant)
  const isLoadable = () =>
    !(hook.state.name === hook.replicant?.name) &&
    getOptionValue(hook.state.name)
  const handleUpdate = () => {
    if (isLoadable()) {
      hook.replicateState({
        type: "load",
        payload: isLoadable(),
      })
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
            freeSolo
            options={options}
            value={hook.state.name}
            onChange={(e, option) =>
              hook.updateState({ type: "name", payload: option })
            }
            name={`${name} Name`}
          />
          <Box ml={1.5}>
            <Button
              color="primary"
              variant="contained"
              disabled={isUpdated()}
              onClick={handleUpdate}
            >
              {isUpdated() ? "Updated" : isLoadable() ? "Load" : "Update"}
            </Button>
          </Box>
        </Box>
      </Section>
      {hook.state.value.map((_, index) => children(index))}
      <Box
        className={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <ButtonGroup variant="text" color="inherit">
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
