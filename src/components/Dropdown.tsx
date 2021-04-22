import React from "react"
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"

export default ({ name, options, ...rest }: any) => (
  <Autocomplete
    options={options}
    fullWidth
    autoHighlight
    disableClearable
    renderInput={params => <TextField {...params} label={name} />}
    {...rest}
  />
)
