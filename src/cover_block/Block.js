'use strict';

import React from 'react'
import { Box, Image, Mask } from 'gestalt'

const WIDTH = 564

const CustomImage = (props) => {
    const { url, ratio = 1, width } = props
    return (
        <Image
            //alt={alt}
            color='#f2f2f2'
            importance='high'
            naturalHeight={width * ratio}
            naturalWidth={width}
            //loading='lazy'
            src={url}
        />
    )
}

const Block = (props) => {
	const { item, width } = props

	const _renderSingleItem = () => {
        return (
			<CustomImage
				visible={true}
				ratio={item.ratio}
				padding={0}
				url={item.url}
                width={WIDTH}
			/>
        )
    }

    const _renderParallelItems = (items) => {
        return (
			<Box display='flex'>
                <Box column={6}>
                    <CustomImage
                        visible={true}
                        ratio={items[0].ratio}
                        url={items[0].url}
                        numColumns={2}
                        padding={0}
                        width={WIDTH / 2}
                    />
                </Box>

                { _renderHorizontalSeparator() }

                <Box column={6}>
                    <CustomImage
                        visible={true}
                        ratio={items[1].ratio}
                        url={items[1].url}
                        numColumns={2}
                        padding={0}
                        width={WIDTH / 2}
                    />
                </Box>
			</Box>
        )
	}
	
	const _renderHorizontalSeparator = () => <Box width={5} color='white' />

	return (
		<Mask>
			{Array.isArray(item) ? _renderParallelItems(item) : _renderSingleItem(item)}
		</Mask>
	)
}

export default Block;