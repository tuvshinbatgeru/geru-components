'use strict';

import React, { useState, useEffect } from 'react'
import { Box, Mask } from 'gestalt'
import Block from './Block'
import { useMediaQuery } from 'react-responsive'

const width = 512
const defaultWidth = width

const ProductCoverBlock = (props) => {
    const { photos, width = defaultWidth } = props
    const [blocks, setBlocks] = useState([])
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    useEffect(() => {
        let dataSources = []
        let index = 0
        while(index < photos.length) {
            let cur = photos[index]
            let next = photos[index + 1]

            if(!cur.is_parallel || next == null) {
                dataSources.push(cur)
                index ++
                continue
            }

            if(cur.ratio != next.ratio) {
                dataSources.push(cur)
                index ++
                continue
            }

            dataSources.push([cur, next])
            index += 2
        }

        setBlocks(dataSources)
    }, [photos])

    const _renderItem = ({ item }) => {
        return (
            <Block item={item} width={width} />
        )
    }

    const _renderSeparator = () => <Box height={width / 160} bg='white' />

    return (
        <Mask rounding={isTabletOrMobile ? 0 : 4}>
            {
                blocks.map((block, index) => [
                    <Block 
                        key={index}
                        item={block}
                        width={width}
                    />,
                    (blocks.length - 1) == index ? null : <Box height={5} color='white' />
                ])
            }
        </Mask>
        // <FlatList 
        //     listKey={(item, index) => index}
        //     scrollEnabled={false}
        //     keyExtractor={(item, index) => String(index)}
        //     data={blocks}
        //     renderItem={_renderItem}
        //     ItemSeparatorComponent={_renderSeparator}
        //     showsVerticalScrollIndicator={false}
        // />
    )
}

export default ProductCoverBlock