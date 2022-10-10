import React, { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import { Box, Column, Image, Mask, Spinner, TapArea, Link } from 'gestalt'
import { Canvas, useFrame } from "@react-three/fiber";
import _deepClone from 'lodash/cloneDeep'
import { useGLTF, OrbitControls } from '@react-three/drei'

import { Icon } from '../index'
import { getBase64 } from '../utils'
import { fetchCustomProducts } from "../utils/api";
import { useMediaQuery } from 'react-responsive'
import HeaderText from "../HeaderText";
import { convertImageToTextureCallback } from "../utils/helpers"

const MockupItem = (props) => {
  const { mockup } = props
  const { glb, name } = mockup
  const { customization = {}, material_maps = [] } = mockup
  const color = "https://res.cloudinary.com/urlan/image/upload/v1651131571/colors/white_x9hchh.png"

  const ref = useRef()
  const object = useGLTF(glb)
  const { scene } = object

  useEffect(() => {
    init()
  }, [glb])

  const init = () => {
    convertImageToTextureCallback(color, function(colorMaterial) {

      console.log(material_maps)

        scene.traverse((obj) => {
            if(obj instanceof THREE.Mesh) {
                obj.material.map = colorMaterial
                obj.material.roughness = material_roughness

                console.log(material_maps)
                
                material_maps.forEach((material) => {
                    if(material.material_url && material.mesh_name.toLowerCase() == obj.name.toLowerCase()) {
                        convertImageToTextureCallback("https://res.cloudinary.com/urlan/image/upload/v1652856130/static/by-me/mug_wxixf2.jpg", function(materialMap) {
                            obj.material.map = materialMap
                        })
                    }
                })
            }
        })
    })
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
    if(mockups.length > 0) setSelectedMockup(mockups[0])
  }, [mockups])

  const HEIGHT = isTabletOrMobile ? 120 : 265
  const EDITOR_HEIGHT = isTabletOrMobile ? 400 : 800

  return (
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
                    minDistance={selected_mockup.min_distance * 2} 
                    maxDistance={600}
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
                src="https://geru.mn/images/by-me.png"
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
  );
};

export default MockupPreview;