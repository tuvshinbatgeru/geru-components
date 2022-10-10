import React from 'react'
import IcoMoon from "react-icomoon"
import iconSet from './icons/selection.json'
import { colors } from './utils'

const Icon = ({ ...props }) => {
    const _getColor = () => {
        switch(props.color) {
            case "black": return colors.colorBlack
            case "red": return colors.colorRed
            case "white": return colors.colorWhite
            case "color": return colors.colorGray
            case "gray": return colors.colorGray
            default: return colors.colorBlack
        }
    }
        
    return (
        <IcoMoon 
            iconSet={iconSet} 
            disableFill={true}
            {...props}
            color={_getColor()}
        />
    );
}

export default Icon