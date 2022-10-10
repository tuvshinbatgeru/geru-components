import React from 'react'
import { Box, Column, TapArea } from 'gestalt'
import HeaderText from './HeaderText'

const TabItem = (props) => {
    const { selected, Link } = props
    const { text, href } = props.tab

    return (
        <Column span={12} mdSpan={3}>
            {
                href ? (
                    <Link route={href}>
                        <TapArea>
                            <Box display='flex' justifyContent='center' paddingY={4} paddingX={2}>
                                <HeaderText size='xl' color={selected ? "red" : "black" }>{text}</HeaderText>
                            </Box>
                            {
                                selected && (
                                    <Box height={4} color='red' />
                                )
                            }
                        </TapArea>
                    </Link>
                ) : (
                    <TapArea onTap={props.onTap}>
                        <Box display='flex' justifyContent='center' paddingY={4} paddingX={2}>
                            <HeaderText size='xl' color={selected ? "red" : "black" }>{text}</HeaderText>
                        </Box>
                        {
                            selected && (
                                <Box height={4} color='red' />
                            )
                        }
                    </TapArea>
                )
            }
            
        </Column>
    )
}

const Tabs = (props) => {
    const { tabs = [], activeTabIndex = 0 } = props

    return (
        <Box width="100%">
            <Box display='flex'>
                {
                    tabs.length < 3 && <Column span={12} mdSpan={3} />
                }
                
                {
                    tabs.map((tab, index) => (
                        <TabItem 
                            key={index}
                            tab={tab}
                            selected={index == activeTabIndex}
                            onTap={({ event }) => props.onChange({
                                event,
                                activeTabIndex: index
                            })}
                        />
                    ))
                }

                {
                    tabs.length < 3 && <Column span={12} mdSpan={3} />
                }
            </Box>
            <Box height={1} color='lightGray' />
        </Box>
    )
}

export default Tabs