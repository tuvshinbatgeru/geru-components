import React from 'react'
import { Box, Text } from 'gestalt'
import styled from 'styled-components'
import colors from './utils/colors'

const LimitedWrapper = styled.div`
  background-color: ${colors.colorOrange};
  height: 40px;
  width: 188px;
  color: ${colors.colorWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
`

const Tagging = (props) => {
    return (
        <Box display='flex'>
            <LimitedWrapper>
                <Text color='white' align='center' weight='bold'>Fundraising</Text>
            </LimitedWrapper>

            <Box width={8} />
        </Box>
    )
}

export default Tagging