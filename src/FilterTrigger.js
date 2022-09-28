import React from 'react'
import { Box, Icon, Text, TapArea } from 'gestalt'

const FilterTrigger = (props) => {
    const { onTap = () => {} } = props
    
    return (
        <div style={{
            position: 'fixed',
            bottom: 72,
            width: '100%',
            zIndex: 99,
        }}>
            <TapArea tapStyle="compress" onTap={onTap}>
                <Box display='flex' justifyContent='center'>
                    <Box color='transparentDarkGray' borderStyle='shadow' height={48} paddingX={4} rounding={8} display='flex' alignItems='center'>
                        <Text color='white' weight='bold'>Шүүх</Text>

                        <Box width={8} />

                        <Icon 
                            icon="filter"
                            color='white'
                            size={12}
                        />
                    </Box>
                </Box>
            </TapArea>
        </div>
    )
}

export default FilterTrigger