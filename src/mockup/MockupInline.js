/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { Box, FixedZIndex, Spinner } from 'gestalt'
import { Canvas } from "@react-three/fiber";
import _deepClone from 'lodash/cloneDeep'

import { 
    useGLTF, 
    OrbitControls,
    Loader,
    Sky,
    Html,
    Cloud,
    useProgress,
    ContactShadows,
    spotLight,
    Lightformer,
    BakeShadows, Environment, useScroll
} from '@react-three/drei'

import { convertImageToTextureCallback } from "../utils/helpers"
import HeaderText from "../HeaderText";

const GlbLoader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress()

    return (
        <Html center>
            <Box position="absolute" left top height="100%" width="100%" zIndex={zIndex} 
                display='flex'
                alignItems="center"
                direction='column'
                justifyContent="center"
                dangerouslySetInlineStyle={{
                    __style: {
                        backgroundColor:'rgba(0,0,30,0.4)',
                        backdropFilter: 'blur(10px)',
                        opacity: 1
                    }
                }}
            >
                <Box display="flex">
                    <HeaderText color='white'>
                        Loading 
                    </HeaderText>
                    <HeaderText color='white'>
                        {progress}%
                    </HeaderText>
                </Box>
                <Box height={12} />
                <Box color='white' rounding='circle' padding={1}> 
                    <Spinner show={true} />
                </Box>
            </Box>
        </Html>
    )
}

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]); 
    return ref.current;
  }

const MockupInline = (props) => {
  const { customization = {}, printable_areas = [], color = "", material_maps = [] } = props
  const { material_roughness, lights = [], glb = '' } = customization
    //console.log("printable_areas",printable_areas);
  const prevColor = usePrevious(color);
  const prevMaterialMaps = usePrevious(material_maps)

  const object = useGLTF(glb)
  const [loading, setLoading] = useState(false)
  const { scene } = object

  useEffect(() => {
    if(prevColor != color || JSON.stringify(prevMaterialMaps) != JSON.stringify(material_maps)){
        init()
    }
  }, [color, material_maps])

  const init = () => {
    convertImageToTextureCallback(color, function(colorMaterial) {
        scene.traverse((obj) => {
           
            if(obj instanceof THREE.Mesh) {
                //console.log("object", obj);
                obj.material.map = colorMaterial
                //if (obj.name.toLowerCase() === 'jersay_urd') {
                //    obj.material.opacity = 1
                //    obj.material.transparent = true
                //} 
                obj.material.roughness = material_roughness
                material_maps.forEach((material) => {
                    if(material.material_url && material.mesh_name.toLowerCase() == obj.name.toLowerCase()) {
                       
                        convertImageToTextureCallback(material.material_url, function(materialMap) {
                            obj.material.map = materialMap
                        })
                        
                    }
                })
            }
        })
        
    })
  }

    const zIndex = new FixedZIndex(2)
    const customMinDistance = customization.name === 'mug' || customization.name === 'mousepad' || customization.name === 'canvas' || customization.name === 'bag' || customization.name === 'jersey'? true : false;
    console.log("customization.name",customization.name);
    const testlight =  [
        {
          //  baruun tseej,
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            30,
            20,
            50
          ],
          "_id": {
            "$oid": "626a39e10c5da727378e162c"
          }
        },
        {
        //  zuun tseej,
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            50,
            20,
            30
          ],
          "_id": {
            "$oid": "626a39e10c5da727378e162d"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            0,
            20,
            50
          ],
          "_id": {
            "$oid": "626a39e10c5da727378e162e"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 5,
          "position": [
            0,
            20,
            -50
          ],
          "_id": {
            "$oid": "626a39e10c5da727378e162f"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            50,
            20,
            0
          ],
          "_id": {
            "$oid": "626a39e10c5da727378e1630"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            -50,
            20,
            0
          ],
          "_id": {
            "$oid": "626a39e10c5da727378e1631"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            -50,
            -20,
            0
          ],
          "_id": {
            "$oid": "626a39e10c5da727378e1631"
          }
        },
        //{
        //  "color": "white",
        //  "intensity": 2,
        //  "power": 8,
        //  "position": [
        //    0,
        //    -20,
        //    0
        //  ],
        //  "_id": {
        //    "$oid": "626a39e10c5da727378e1632"
        //  }
        //}
      ]
    const jerseyLigthgs = [
        {
          "color": "white",
          "intensity": 2,
          "power": 16,
          "position": [
            50,
            20,
            0
          ],
          "_id": {
            "$oid": "6269126886a0a77f91886dd8"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            50,
            20,
            30
          ],
          "_id": {
            "$oid": "6269126886a0a77f91886dd9"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            0,
            20,
            50
          ],
          "_id": {
            "$oid": "6269126886a0a77f91886dda"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            0,
            20,
            -50
          ],
          "_id": {
            "$oid": "6269126886a0a77f91886ddb"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            50,
            20,
            0
          ],
          "_id": {
            "$oid": "6269126886a0a77f91886ddc"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 8,
          "position": [
            -50,
            20,
            0
          ],
          "_id": {
            "$oid": "6269126886a0a77f91886ddd"
          }
        },
        {
          "color": "white",
          "intensity": 2,
          "power": 16,
          "position": [
            0,
            -20,
            0
          ],
          "_id": {
            "$oid": "6269126886a0a77f91886dde"
          }
        }
      ]
    return (
        <Box height='100%' display="flex" wrap>
            <Box column={12} smColumn={8} flex='grow' position="relative">
                {
                    loading && (
                        <Box position="absolute" left top height="100%" width="100%" zIndex={zIndex} 
                            display='flex'
                            alignItems="center"
                            direction='column'
                            justifyContent="center"
                            dangerouslySetInlineStyle={{
                                __style: {
                                    backgroundColor:'rgba(0,0,30,0.4)',
                                    backdropFilter: 'blur(10px)',
                                    opacity: 1
                                }
                            }}
                        >
                            <HeaderText color='white'>
                                Loading ...
                            </HeaderText>
                            <Box height={12} />
                            <Box color='white' rounding='circle' padding={1}> 
                                <Spinner show={true} />
                            </Box>
                        </Box>
                    )
                }

                <Canvas>
                    {
                        jerseyLigthgs.map((light, index) => (
                            <pointLight 
                                key={index}
                                color={light.color} 
                                intensity={light.intensity} 
                                position={light.position} 
                                // distance={1}
                                power={light.power} 
                            />
                            
                        ))
                    }
                    {/*<spotLight  intensity={10} position={[10, 10, 10]} shadow-mapSize-width={5048} shadow-mapSize-height={5048} />*/}
   
                    {/*<Sky distance={75000} sunPosition={[0, 50, 0]} inclination={2} azimuth={0.25} />*/}
                   
                    {/*<Lightformer
                        form="rect" // circle | ring | rect (optional, default = rect)
                        intensity={1} // power level (optional = 1)
                        color="orange" // (optional = white)
                        scale={[50, 50]} // Scale it any way you prefer (optional = [1, 1])
                        target={[-50, 50, 50]} // Target position (optional = undefined)
                    />*/}
                    <Suspense fallback={null}>
                        <group>
                            <primitive object={scene} />
                        </group>
                    </Suspense>
                    {/*<Environment background  resolution={512}>
                        <mesh scale={100}>
                            <sphereGeometry args={[1, 64, 64]} />
                            <LayerMaterial side={THREE.BackSide}>
                                <Depth colorA="red" colorB="blue" alpha={0.5} mode="multiply" near={0} far={300} origin={[100, 100, 100]} />
                            </LayerMaterial>
                        </mesh>
                    </Environment>*/}
                    
                    <OrbitControls 
                        minPolarAngle={Math.PI / 3} 
                        maxPolarAngle={Math.PI / 1.5} 
                        autoRotate
                        minDistance={customization.name === 'jersey' ?   30: customMinDistance ?  18: 25 } 
                        //minDistance={customMinDistance ?  18: 25 } 
                        maxDistance= {100}
                    />
                    
                </Canvas>
                {/*<Loader
                    containerStyles={{
                        backgroundColor:'rgba(0,0,30,0.4)',
                        backdropFilter: blur('40px'),
                        opacity: 1,
                    }}
                    dataInterpolation={(p) => `УНШИЖ БАЙНА ${p.toFixed(0)}%`} 
                />*/}
               
                
            </Box>
        </Box>
    );
};

export default MockupInline;