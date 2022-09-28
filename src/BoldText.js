import React, { useState, useEffect } from 'react'

const BoldText = (props) => {
    const { size = 'sm', weight = '700', color = 'black', align = 'start' } = props
    const [schema, setSchema] = useState('light')
    //const [schema, setSchema] = useState('dark')

    useEffect(() => {
        //setSchema(window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light')
    }, [])

    const _darkGetColor = () => {
        switch(color) {
            case 'black': return '#fff'
            case 'orange': return '#F07900'
            case 'white': return '#000'
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
            case 'empty': return '#fff'
            case 'green': return '#00CDA5'
            case 'cyan': return '#21E3C5'
            default: return '#000'
        }
    }

    const _getSize = () => {
        switch(size) {
            case 'sm': return 16
            case 'md': return 18
            case 'lg': return 21
            case '2lg': return 24
            case 'xl': return 26
            case 'xxl': return 31
            case 'half-3xl' : return 36
            case '3xl': return 72
            default: return 16
        }
    }

    return <p style={{
        fontWeight: weight,
        color: schema == 'light' ? _getColor() : _darkGetColor(),
        fontSize: _getSize(),
        textAlign: align,
        display: 'inline',
        marginTop: 0,
        marginBottom: 0,
    }}>{props.children}</p>
}

export default BoldText