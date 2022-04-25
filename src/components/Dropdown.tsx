import React from "react"
import { TextField } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"

type DropdownProps = {
  name: string
  options: Array<any>
  [key: string]: React.ReactNode
}

export default ({ name, options, ...rest }: DropdownProps) => (
  <Autocomplete
    options={options}
    fullWidth
    autoHighlight
    disableClearable
    handleHomeEndKeys
    clearOnBlur
    selectOnFocus
    renderInput={params => <TextField {...params} label={name} />}
    {...rest}
  />
)
