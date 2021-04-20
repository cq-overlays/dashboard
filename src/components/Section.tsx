import React from "react"
import { css } from "@emotion/css"
import { Box, InputLabel } from "@material-ui/core"
import { theme } from "../render"

const Section = ({ title = null, children, ...rest }: any) => (
  <>
    {title && (
      <InputLabel
        className={css`
          margin-bottom: ${theme.spacing(0.5)}px;
        `}
      >
        {title}
      </InputLabel>
    )}
    <Box bgcolor="grey.300" p={1.5} mb={1.5} {...rest}>
      {children}
    </Box>
  </>
)

export default Section
