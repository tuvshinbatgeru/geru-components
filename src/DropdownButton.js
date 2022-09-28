import React from 'react'
import { Box, TapArea } from 'gestalt'
import HeaderText from './HeaderText'
import { Icon } from './Icon'
import styled from 'styled-components'
import { colors } from './utils'
import { useMediaQuery } from 'react-responsive'

const Wrapper = styled.div`
    height: ${props => props.height}px;
    border-radius: ${props => props.height / 2}px;
    display: flex;
    align-items: center;
    background: ${colors.colorBlack};
    padding-left: ${props => props.padding}px;
    padding-right: ${props => props.padding}px;
`

const DropdownButton = (props) => {
    const { title, anchorRef, isOpen = false, onClick = () => {} } = props
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <TapArea 
            tapStyle="compress" 
            fullWidth={false}
            accessibilityControls="truncation-dropdown-example"
            accessibilityExpanded={isOpen}
            accessibilityHaspopup
            iconEnd="arrow-down"
            onTap={onClick}
            ref={anchorRef}
            selected={isOpen}
        >
            <Wrapper padding={isTabletOrMobile ? 12 : 24} height={isTabletOrMobile ? 50 : 72}>
                <HeaderText font='highlight' size={isTabletOrMobile ? "xl" : "3xl"} color='red'>#</HeaderText>
                <HeaderText size={isTabletOrMobile ? "xl" : "3xl"} color='white'>{title}</HeaderText>
                <Box width={12} />
                <Icon icon="Dropdown" size={17} color="red" />
            </Wrapper>
        </TapArea>
    )
}

export default DropdownButton