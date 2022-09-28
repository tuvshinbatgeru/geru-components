import React, { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import { Box, Column, Image, Mask, Spinner, TapArea } from 'gestalt'
import { Canvas, useFrame } from "@react-three/fiber";
import _deepClone from 'lodash/cloneDeep'

import { 
  useGLTF, 
  PerspectiveCamera,
  OrbitControls,
} from '@react-three/drei'


import { Link, Icon, Swiper } from '../../components'
import { getBase64 } from '../../utils/api'
import { fetchCustomProducts } from "app/modules/custom/CustomApi";
import { useMediaQuery } from 'react-responsive'
import HeaderText from "../HeaderText";
import { MainWrapper } from "app/modules/layout/styles";
//const ROUGHNESS_VALUE = 0.35

const convertImageToTexture = async (external_url) => {
  if(!external_url) return null

  const textureLoader = new THREE.TextureLoader();

  let base64 = await getBase64(external_url)

  const ImageUri = `data:image/jpeg;base64,${base64}`

  let texture = textureLoader.load(ImageUri)

  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;
  texture.repeat.x = 1;

  return texture;
};

const MockupItem = (props) => {
  const color = "0xffffff"
  //const color = 0xede3cc
  const { mockup } = props
  const { glb, name } = mockup
  const ref = useRef()
  const object = useGLTF(glb)
  const [scene, setScene] = useState(null)

  useEffect(() => {
    init()
  }, [glb])

  const init = () => {
    let scene = object.scene

    if(scene == null) return

    scene.traverse(async (obj) => {
      if (
        obj instanceof THREE.Mesh &&
        (
          obj.name == "polySurface5" ||
          obj.name == "texture" ||
          obj.name == "teexture" || 
          obj.name == "material"
        )
      ) {
        let material = obj.material;
        material.roughness = mockup.material_roughness

        //const test_url = "https://res.cloudinary.com/urlan/image/upload/v1649847711/temp/Group_4_vz7qk8.jpg"
        const test_url = "https://res.cloudinary.com/urlan/image/upload/v1652856130/static/by-me/mug_wxixf2.jpg"

        const map = await convertImageToTexture(test_url)
        material.map = map
      }

      //console.log(obj)

      if (
        obj instanceof THREE.Mesh &&
        (
          // obj.name == "polySurface5" ||
          // obj.name == "texture" ||
          // obj.name == "teexture" || 
          obj.name == "texture_urd_tal" || 
          obj.name == "texture_baruun" ||
          obj.name == "texture_zuun" ||
          obj.name == "texxture_zuun" ||
          obj.name == "texture_urd"
        )
      ) {
        let material = obj.material;
        material.roughness = mockup.material_roughness
        material.color.set(color)

        // const test_url = "https://res.cloudinary.com/urlan/image/upload/v1645713689/artwork/original/1000x1000_KftcqjKgGz_cc3164718bd776cec58b42d3c7b05a6e.png"
        const test_url = "https://res.cloudinary.com/urlan/image/upload/v1652856130/static/by-me/mug_wxixf2.jpg"

        const map = await convertImageToTexture(test_url)
        material.map = map
      }

      if (
        obj instanceof THREE.Mesh &&
        (
          obj.name == "texture_baruun" ||
          obj.name == "texture_busad"
        )
      ) {
        let material = obj.material;
        material.color.set(color)
      }

      if (
        obj instanceof THREE.Mesh &&
        (
          obj.name == "texture_tomor"
        )
      ) {
        let material = obj.material;
        material.roughness = 0
        material.color.set(color)
      }

      if (
        obj instanceof THREE.Mesh &&
        (
          obj.name == "texture_ard"
        )
      ) {
        let material = obj.material;
        material.roughness = mockup.material_roughness
        

        const test_url = "https://res.cloudinary.com/urlan/image/upload/v1652856130/static/by-me/mug_wxixf2.jpg"
        material.color.set(color)
        //const test_url = "https://res.cloudinary.com/urlan/image/upload/v1641357448/artwork/original/1444x2048_XK1uPOD2nR_5627f734b2ff768812bb4b9999f87bea.png"

        const map = await convertImageToTexture(test_url)
        material.color.set(color)
        material.map = map
        
      }

      if (
        obj instanceof THREE.Mesh &&
        (
          obj.name == "texture_baruun"
        )
      ) {
        let material = obj.material;
        material.roughness = mockup.material_roughness

        const test_url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBgxUwAAU+n3sIAAAAASUVORK5CYII="
        //const test_url = "https://res.cloudinary.com/urlan/image/upload/v1641357448/artwork/original/1444x2048_XK1uPOD2nR_5627f734b2ff768812bb4b9999f87bea.png"

        const map = await convertImageToTexture(test_url)
        material.map = map
      }

      if (
        obj instanceof THREE.Mesh &&
        (
          obj.name == "texture_zuun"
        )
      ) {
        let material = obj.material;
        material.roughness = mockup.material_roughness

        const test_url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBgxUwAAU+n3sIAAAAASUVORK5CYII="
        //const test_url = "https://res.cloudinary.com/urlan/image/upload/v1641357448/artwork/original/1444x2048_XK1uPOD2nR_5627f734b2ff768812bb4b9999f87bea.png"

        const map = await convertImageToTexture(test_url)
        material.map = map
      }

      if (
        obj instanceof THREE.Mesh &&
        (
          obj.name == "texture_malgai_zuun" ||
          obj.name == "texture_malgai_baruun" || 
          obj.name == "texture_halaas" ||
          obj.name == "texture_kant"
        )
      ) {
        let material = obj.material;
        material.roughness = mockup.material_roughness
        material.color.set(color)

        const test_url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBgxUwAAU+n3sIAAAAASUVORK5CYII="
        //const test_url = "https://res.cloudinary.com/urlan/image/upload/v1641357448/artwork/original/1444x2048_XK1uPOD2nR_5627f734b2ff768812bb4b9999f87bea.png"

        const map = await convertImageToTexture(test_url)
        material.map = map
      }

      if (
        obj instanceof THREE.Mesh &&
        (
          obj.name == "undsen"
        )
      ) {
        let material = obj.material;
        material.roughness = mockup.material_roughness

        const test_url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAA1BMVEX///+nxBvIAAAAR0lEQVR4nO3BAQ0AAADCoPdPbQ8HFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPBgxUwAAU+n3sIAAAAASUVORK5CYII="
        //const test_url = "https://res.cloudinary.com/urlan/image/upload/v1641357448/artwork/original/1444x2048_XK1uPOD2nR_5627f734b2ff768812bb4b9999f87bea.png"

        const map = await convertImageToTexture(test_url)
        material.map = map
      }
    }) 

    setScene(scene)
  }

  return (
    <group ref={ref}>
      { scene != null && <primitive object={scene} /> }
    </group>
  )
}

const MockupPreview = (props) => {
  const [scene, setScene] = useState({})
  const [fetching, setFetching] = useState(false)

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const [mockups, setMockups] = useState([])
  const [selected_mockup, setSelectedMockup] = useState({})

  useEffect(() => {
    //init()
  }, [selected_mockup])

  useEffect(() => {
    getCustomProducts()
  }, [])

  const getCustomProducts = () => {
    setFetching(true)
    fetchCustomProducts()
    .then(res => {
      if(res.data.code == 0) {
        setMockups(res.data.customizations)
      }
    })
    .then(() => setFetching(false))
  }

  useEffect(() => {
    if(mockups.length > 0)
      setSelectedMockup(mockups[0])
  }, [mockups])

  const HEIGHT = isTabletOrMobile ? 120 : 265
  const EDITOR_HEIGHT = isTabletOrMobile ? 400 : 800
  const customMinDistance = selected_mockup.name === 'mug' || selected_mockup.name === 'mousepad' || selected_mockup.name === 'canvas' || selected_mockup.name === 'bag' ? true : false;

  return (
    <Box display="flex" wrap>
      <MainWrapper>
        <Box display='flex' wrap paddingY={10}>
          <Box column={12} smColumn={5} flex='grow' position="relative">
              <Box height={EDITOR_HEIGHT}>
              {
                fetching ? (
                  <Spinner show={true} />
                ) : (
                  <Canvas 
                    shadows dpr={[1, 2]} camera={{ position: [0, 0, 1.1], fov: 50 }}
                  >
                    {
                      selected_mockup.lights && selected_mockup.lights.map((light, index) => (
                        <pointLight key={index} color={light.color} intensity={light.intensity} position={light.position} power={light.power} />
                      ))
                    }
                    
                    <Suspense fallback={null}>
                        <MockupItem 
                          scene={scene}
                          mockup={selected_mockup}
                        />
                    </Suspense>

                    {/* <OrbitControls 
                      autoRotate 
                    /> */}
                    <OrbitControls 
                        autoRotate 
                        minPolarAngle={Math.PI / 3} 
                        maxPolarAngle={Math.PI / 1.5} 
                        minDistance={customMinDistance ? 20 : 50} 
                        maxDistance= {100}
                     />
                  </Canvas>
                )
              }
              </Box>
              <Box height={120} paddingX={6} paddingY={4} display="flex">
                  {/* <Swiper
                      spaceBetween={12}
                      slidesPerView={4}
                  > */}
                  {
                    mockups.map((mockup, index) => (
                      <Column span={3}>
                          <TapArea tapStyle="compress" onTap={() => setSelectedMockup(mockup)}>
                            <Box>
                              <Mask>
                                <Image 
                                  src={mockup.product.template.promotion_url}
                                  naturalHeight={1}
                                  naturalWidth={1}
                                />
                              </Mask>
                            </Box>
                          </TapArea>
                      </Column>
                    ))
                  }
              </Box>
          </Box>
          <Column span={12} smSpan={1} mdSpan={1} />
          <Box 
            column={12} 
            smColumn={4}
            display='flex' 
            direction='column' 
            justifyContent="center" 
            paddingX={6} 
            paddingY={8}
          > 
            <Box>
              <Box paddingY={4}>
                  <Icon 
                    size={36}
                    color='black'
                    icon="Ar"
                  />
              </Box>
              <Box>
                <Mask height={HEIGHT} width={HEIGHT * 1.899305555555556}>
                  <Image 
                    src="/images/by-me.png"
                    naturalHeight={1}
                    naturalWidth={1}
                  />
                </Mask>
                <Box height={40} />
                <Box display="flex" wrap>
                  <HeaderText size='2lg'>with help of our artists’ templates, quality content and our design tools to choose from, get a headstart on bringing your best ideas and work to life.</HeaderText>
                </Box>
              </Box>
              <Box height={40} />
                <Link route={`/by-me`}>
                  <TapArea tapStyle="compress">
                    <Box height={65} color='red' display="flex" alignItems="center" width={260} justifyContent='center' rounding={8}>
                      <Icon 
                        icon="Lets"
                        size={128.9}
                        color='white'
                      />
                    </Box>
                  </TapArea>
                </Link>
              </Box>
          </Box>
          <Column span={12} smSpan={2} mdSpan={2} />
        </Box>
      </MainWrapper>
    </Box>
  );
};

export default MockupPreview;

// {
//   name: "mug",
//   url: "https://s3-eu-west-1.amazonaws.com/simplood.geruapp/material/mug-white/studio.png",
//   roughness: 0,
// }, {
//   name: "frame",
//   url: "https://res.cloudinary.com/urlan/image/upload/v1644224110/mockup/frame/1x1/NY_5_Frame_1x1_r7kfbm.jpg",
//   roughness: 0,
// }, {
//   name: "canvas",
//   url: "https://res.cloudinary.com/urlan/image/upload/v1644224220/mockup/canvas/NY_2_Canvas_uybjay.jpg",
//   roughness: 1,
// }, {
//   name: "tote-bag",
//   url: "https://res.cloudinary.com/urlan/image/upload/v1644224051/mockup/tote-bag/NY_6_Tote_vfh6kg.jpg",
//   roughness: 1,
// }, {
//   name: "card-holder",
//   url: "https://res.cloudinary.com/urlan/image/upload/v1644224278/mockup/cardholder/NY_8_Namecard_lwuqak.jpg",
//   roughness: 0,
// }, {
//   name: "hoodie",
//   url: "https://ean-images.booztcdn.com/levi-men/1300x1700/g/lsm3458100100_cneutrals_1.jpg",
//   roughness: 1,
// }, {
//   name: "sweat-shirt",
//   url: "https://ean-images.booztcdn.com/levi-men/1300x1700/g/lsm3458100100_cneutrals_1.jpg",
//   roughness: 1,
// }, {
//   name: "tee",
//   url: "",
//   roughness: 1,
// }, {
//   name: "mousepad",
//   url: "https://ean-images.booztcdn.com/levi-men/1300x1700/g/lsm3458100100_cneutrals_1.jpg",
//   roughness: 1
// }