import { Autocomplete, AutocompleteProps, TextField } from "@mui/material"

interface DropdownProps<T> extends AutocompleteProps<T, true, true, true> {
  name: string
  options: Array<T>
}

export default ({ options, name, ...props }: DropdownProps) => (
  <Autocomplete
    options={options}
    fullWidth
    autoHighlight
    disableClearable
    handleHomeEndKeys
    clearOnBlur
    selectOnFocus
    renderInput={params => (
      <TextField variant="standard" {...params} label={name} />
    )}
    {...props}
  />
)
