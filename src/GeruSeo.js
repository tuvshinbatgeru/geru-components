'use strict';

import React from 'react';
import { NextSeo, SocialProfileJsonLd } from 'next-seo';

const FACEBOOK_APP_ID = "571006673273454"

const GeruSeo = (props) => {
    let { title, description, image, path, additionalMetaTags = [] } = props.params

    return (
        <>
          <SocialProfileJsonLd
              type="Business"
              name="GERU - #Different Makes Us"
              url="https://www.geru.mn/"
              sameAs={[
                'https://www.facebook.com/geru.mn',
                'https://www.instagram.com/geru.mn/',
              ]}
          />
          <NextSeo
              title={title}
              description={description}
              canonical={`https://www.geru.mn${path}`}
              facebook={{
                appId: FACEBOOK_APP_ID,
              }}
              openGraph= {{
                url: `https://www.geru.mn${path}`,
                type: 'product',
                title: title,
                description: description,
                images: [
                  {
                    url: image,
                    width: 1080,
                    height: 1080,
                    alt: title,
                    objectFit: "contain",
                  }
                ],
                site_name: 'www.geru.mn',
              }}
              twitter={{
                title: title,
                image: image,
                description: description,
                cardType: 'summary_large_image',
              }}
              additionalMetaTags={additionalMetaTags}
          />
      </>
    )
}


export default GeruSeo