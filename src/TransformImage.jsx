import React from 'react'
import { Image } from 'gestalt'
import { extractPublicId } from 'cloudinary-build-url'
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

const cloudinary = new Cloudinary({
    cloud: {
      cloudName: "urlan"
    },
})

const TransformImage = (props) => {
    const { url, width = 300, bg = 'transparent', height = 300 } = props
    const public_id = extractPublicId(url)

    const image = cloudinary.image(public_id)

    let transformed_url = image
    .resize(thumbnail().width(width).height(height)) 
    .toURL()

    transformed_url = transformed_url.replaceAll("%2520", "%20")

    return (
        <Image 
            src={transformed_url}
            naturalWidth={width}
            naturalHeight={height}
        />
    )
}

export default TransformImage