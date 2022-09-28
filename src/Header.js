import React from 'react'
import { Heading } from 'gestalt'
import { useMediaQuery } from 'react-responsive'

const Header = (props) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    return (
        <Heading size={isTabletOrMobile ? 'sm' : 'md'}>{props.children}</Heading>
    )
}

export default Header