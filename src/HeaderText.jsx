import { colors } from './utils'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
//font-family: "GeruMachinaBold" !important;
//font-family: "GeruMachinaBold" !important;

const Text = styled.span`
    font-weight: ${props => props.weight};
    font-family: "${props => props.font}" !important;
    color: ${props => props.color};
    display: 'inline';
    letter-spacing: ${props => props.letterSpacing}px;
    text-align: ${props => props.align};
    line-height: ${props => props.lineHeight}em !important;
    margin-top: ${props => props.marginTop}em;
    white-space: ${props => props.whiteSpace};
    font-size: ${props => props.size}px;
    margin-bottom: 0;
    overflow: hidden;
    text-decoration: ${props => props.decoration};
    display: -webkit-box;
    -webkit-line-clamp: ${props => props.lineClamp};
    -webkit-box-orient: vertical;
    
    &:hover {
        color: ${props => props.hoverTextColor};
        -webkit-text-fill-color: ${props => props.stokeWidth > 0 ? "transparent" : "none"}; /* Will override color (regardless of order) */
        -webkit-text-stroke-width: ${props => props.stokeWidth}px;
        -webkit-text-stroke-color: #CD1E3B;        
    }
`


const HeaderText = (props) => {
    const { 
        size = 'half-3xl', 
        weight = 'regular', 
        color = 'black', 
        align = 'start', 
        lineClamp = 100,
        lineHeight = 0.9,
        letterSpacing = 'normal',
        whiteSpace = 'wrap',
        decoration,
        stokeWidth = 0,
        hoverTextColor = "",
        font = "header"//header, body, highlight
    } = props
    const [schema, setSchema] = useState('light')

    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    const isMobile = useMediaQuery({ maxWidth: 767 })

    useEffect(() => {
        //setSchema(window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light')
    }, [])

    const _darkGetColor = () => {
        switch(color) {
            case 'black': return '#fff'
            case 'orange': return '#F07900'
            case 'white': return '#000'
            case 'light': return '#fff'
            case 'empty': return '#fff'
            case 'green': return '#00CDA5'
            case 'cyan': return '#21E3C5'
            default: return '#000'
        }
    }

    const _getColor = () => {
        switch(color) {
            case 'black': return '#000'
            case 'orange': return '#F07900'
            case 'white': return '#fff'
            case 'light': return '#fff'
            case 'empty': return '#fff'
            case 'primary': return colors.colorRed
            case 'secondary': return colors.colorBlack
            case 'pink': return colors.colorPink
            case 'red': return colors.colorRed
            case 'gray': return colors.colorGray
            case 'green': return '#00CDA5'
            case 'cyan': return '#21E3C5'
            case 'zorig_blue': return '#397AFF'
            default: return '#000'
        }
    }

    const _getSize = () => {
        let divider = 1//isTablet ? 1)

        if(isTablet) {
            divider = 1.2
        }

        if(isMobile) {
            divider = 1.4
        }

        switch(size) {
            case 'sm': return 16 / divider
            case 'md': return 18 / divider
            case 'lg': return 21 / divider
            case '2lg': return 24 / divider
            case 'xl': return 28 / divider
            case 'xxl': return 32 / divider
            case 'half-3xl' : return 36 / divider
            case '3xl': return 48 / divider
            case '4xl': return 72 / divider
            case '5xl': return 96 / divider
            case '6xl': return 140 / divider
            case '7xl': return 200 / divider
            default: return 16 / divider
        }
    }

    const _getFont = () => {
        switch(font) {
            case "header": return 'GeruBebas'
            case "regular": return "GeruRegular"
            case "body": return 'GeruMachina'
            case "highlight": return 'DifferentMakesUs'
            default: return font
        }
    }

    const marginTop = font == 'highlight' ? 0.15 : 0

    return (
        <Text 
            size={_getSize()} 
            lineHeight={lineHeight} 
            font={_getFont()} 
            color={_getColor()} 
            weight={weight} 
            align={align}
            marginTop={marginTop}
            decoration={decoration}
            whiteSpace={whiteSpace}
            letterSpacing={letterSpacing}
            lineClamp={lineClamp}
            stokeWidth={stokeWidth}
            hoverTextColor={hoverTextColor}
        >{props.children}</Text>
    )
}

export default HeaderText