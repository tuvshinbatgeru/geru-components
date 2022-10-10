import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Box, Sticky, ScrollBoundaryContainer } from 'gestalt'
import { useWindowSize } from './utils/helpers'

const Wrapper = (props) => {
    const { top = 120 } = props
    const size = useWindowSize()

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    if(isTabletOrMobile) {
        return <Box>{props.children}</Box>
    }

    return (
        <Sticky top={top} height={size.height / 1.2}>
            <ScrollBoundaryContainer>
                {props.children}
            </ScrollBoundaryContainer>
        </Sticky>
    )
}

export default Wrapper