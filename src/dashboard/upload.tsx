import React from "react"
import { css } from "@emotion/css"
import { Box, Button, Input } from "@material-ui/core"

import render from "../render"
import useLoadedDataReplicant from "../hooks/useLoadedDataReplicant"
import Section from "../components/Section"

const Panel = () => {
  const [loadedData, uploadData] = useLoadedDataReplicant()
  const [selectedFile, setSelectedFile]: any = React.useState()
  const [inputKey, setInputKey] = React.useState(Date.now())

  const handleSelect = (event: any) => {
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit = async () => {
    const json = JSON.parse(await selectedFile.text())
    uploadData(json)
    setSelectedFile(undefined)
    setInputKey(Date.now())
  }

  return (
    <Box>
      <Section>
        <Input type="file" key={inputKey} onChange={handleSelect} />
        <Box
          mt={3}
          className={css`
            display: flex;
            justify-content: space-between;
            align-items: baseline;
          `}
        >
          <Box />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Box>
      </Section>
    </Box>
  )
}

render(Panel)
