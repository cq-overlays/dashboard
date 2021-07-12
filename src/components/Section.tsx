import React from "react"
import { Box } from "@material-ui/core"

type SectionProps = {
  children: React.ReactFragment
  [key: string]: React.ReactNode
}

const Section = ({ title, children, ...rest }: SectionProps) => (
  <Box bgcolor="grey.300" p={1.5} mb={1.5} {...rest}>
    {children}
  </Box>
)

export default Section
