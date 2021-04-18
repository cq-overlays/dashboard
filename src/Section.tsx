import * as React from "react"
import { Box } from "@material-ui/core"

const Section = ({ children }) => (
  <Box bgcolor="grey.300" p={1.5} mb={1.5}>
    {children}
  </Box>
)

export default Section
