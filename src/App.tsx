import React from 'react'
import { Box, Text } from 'gestalt'
import HeaderText from './HeaderText'
import { MockupPreview } from './mockup'

const App = () => {
    return (
        <Box width='100%' height='100%'>
            <Text>TEST</Text>

            <Box width={100}>
                <HeaderText whiteSpace='wrap'>Hey This is text</HeaderText>
            </Box>
        </Box>
    )
}

export default App