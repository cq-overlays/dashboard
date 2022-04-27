import React from "react"
import { Box } from "@mui/material"

type SectionProps = {
  children: JSX.Element
  [key: string]: React.ReactNode
}

const Section = ({ children, ...rest }: SectionProps) => (
  <Box bgcolor="grey.300" p={1.5} mb={1.5} {...rest}>
    {children}
  </Box>
)

export default Section
