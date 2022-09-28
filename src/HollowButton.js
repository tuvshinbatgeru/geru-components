import React from 'react'
import { Box } from 'gestalt'
import HeaderText from './HeaderText'
import styled from 'styled-components'

const Wrapper = styled.div`
    border-radius: 30px;
    border: ${props => props.borderless ? 0 : 2}px solid ${props => props.bC};
`

const HollowButton = (props) => {
    const { text = "Илүү ихийг", color='black', 
        size = 'lg', bC = "#1B1927", borderless = true,
        align = 'start'
    } = props

    return (
        <Wrapper borderless={borderless} bC={bC}>
            <Box 
                display='flex' 
                direction='row' 
                alignItems='center'
                paddingX={borderless ? 0 : 4}
                mdPaddingX={borderless ? 0 : 6}
                lgPaddingX={borderless ? 0 : 10}
                paddingY={2}
                justifyContent={align}
            >
                <HeaderText size={size == 'lg' ? 'half-3xl' : "2lg"} color={color}>{text}</HeaderText>
                <HeaderText size={size == 'lg' ? 'half-3xl' : "2lg"} font='highlight' color='red'>+</HeaderText>
            </Box>
        </Wrapper>
    )
}

export default HollowButton