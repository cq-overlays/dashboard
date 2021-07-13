import React from "react"
import { css } from "@emotion/css"
import { Typography, Box, InputBase, Button } from "@material-ui/core"
import render, { theme } from "../render"
import Section from "../components/Section"
import useLoadedData, { LoadedData, defaultData } from "../hooks/useLoadedData"
import { ReplicantReturnType } from "../hooks/useReplicant"

const Panel = () => {
  const loadedData = useLoadedData()

  return (
    <>
      <UploadSection loadedData={loadedData} />
      <DataManagerSection loadedData={loadedData} />
    </>
  )
}

type SectionProps = {
  loadedData: ReplicantReturnType<LoadedData>
}

const UploadSection = ({ loadedData }: SectionProps) => {
  const [selectedFile, setSelectedFile]: any = React.useState()
  const [inputKey, setInputKey] = React.useState(Date.now())

  const handleSubmit = async () => {
    const json = JSON.parse(await selectedFile.text())
    loadedData.replicateState({ type: "upload", payload: json })
    setSelectedFile(undefined)
    setInputKey(Date.now())
  }

  return (
    <Section>
      <Box
        className={css`
          display: flex;
          align-items: center;
        `}
      >
        <InputBase
          type="file"
          key={inputKey}
          onChange={e => {
            setSelectedFile(e.target.files[0])
          }}
          inputProps={{ style: { height: "100%" } }}
        />
        <Box ml={1.5}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Section>
  )
}

const DataManagerSection = ({ loadedData }: SectionProps) => {
  const isDefault = (key: string) =>
    JSON.stringify(loadedData.state[key]) === JSON.stringify(defaultData[key])
  return (
    <Section
      className={css`
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: ${theme.spacing(3)}px;
      `}
    >
      {Object.keys(defaultData).map(key => {
        return (
          <Box
            key={key}
            className={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <Typography>
              {key.slice(0, 1).toUpperCase() + key.slice(1)} Data
            </Typography>
            <Button
              color="primary"
              variant="contained"
              disabled={isDefault(key)}
              onClick={() =>
                loadedData.replicateState({ type: "resetKey", payload: key })
              }
            >
              {isDefault(key) ? "Default Value" : "Reset to Default"}
            </Button>
          </Box>
        )
      })}
    </Section>
  )
}

render(Panel)
